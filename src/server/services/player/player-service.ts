import { Service, OnStart, OnInit, Reflect, Flamework } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import Log from "@rbxts/log";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Functions } from "server/events";
import PlayerEntity from "server/modules/classes/player-entity";
import { IPlayerData } from "shared/data/default-player-data";
import { isFlameworkService } from "shared/util/flamework-utils";
import KickCode from "types/enum/kick-reason";
import { IServerResponse } from "types/interfaces/network";
import PlayerDataService from "./player-data-service";
import PlayerRemovalService from "./player-removal-service";

export interface OnPlayerJoin {
    /**
     * Fires when a player joins the game and is fully initialized. The player
     * is considered "fully initialized" once all of their data is loaded and
     * their PlayerEntity class is fully setup. At which point, anything that
     * implements this lifecycle event will be fired with the class.
     */
    onPlayerJoin(playerEntity: PlayerEntity): void;
}

/**
 * This service handles creating the new PlayerEntity class when somebody joins
 * as well as firing off the lifecycle event.
 */
@Service({})
export class PlayerService implements OnStart, OnInit {
    private playerJoinEvents = new Map<string, OnPlayerJoin>();
    private playerEntities = new Map<Player, PlayerEntity>();
    private onEntityRemoving = new Signal();

    constructor(private playerDataService: PlayerDataService, private playerRemovalService: PlayerRemovalService) {}

    public onInit(): void {
        Players.PlayerAdded.Connect((p) => this.onPlayerJoin(p));
        Players.PlayerRemoving.Connect((p) => this.onPlayerRemoving(p));

        // We want to hold the server open until all PlayerEntities are cleaned up
        // and removed.
        game.BindToClose(() => {
            Log.Debug("Game closing, holding open until all PlayerEntities clean up");
            while (this.playerEntities.size() > 0) this.onEntityRemoving.Wait();
            Log.Debug("All PlayerEntities cleaned up, closing game");
        });
    }

    public onStart(): void {
        Functions.requestPlayerData.setCallback((p) => this.onPlayerRequestedData(p));

        // Find all services which implement PlayerJoin and save them for later
        for (const [obj, id] of Reflect.objToId) {
            if (!isFlameworkService(obj)) continue;
            const dependency = Flamework.resolveDependency(id);
            if (Flamework.implements<OnPlayerJoin>(dependency)) {
                this.playerJoinEvents.set(id, dependency);
            }
        }
    }

    /**
     * Called by the client to request their initial player data.
     *
     * TODO: Retry if their profile hasn't loaded yet, this will error if player data
     * is requested too early.
     */
    private async onPlayerRequestedData(player: Player): Promise<IServerResponse<IPlayerData>> {
        const entity = this.getEntity(player);
        if (!entity) return { success: false, error: "No player entity" };

        return {
            success: true,
            data: entity.data,
        };
    }

    private async onPlayerJoin(player: Player) {
        // Setup player entity
        const playerProfile = await this.playerDataService.loadPlayerProfile(player);

        if (!playerProfile) {
            this.playerRemovalService.removeForBug(player, KickCode.PlayerEntityInstantiationError);
            return;
        }

        const janitor = new Janitor();
        janitor.Add(() => {
            Log.Info(`Player {@Player} leaving game, cleaning up Janitor`, player);

            // We want to add an attribute so systems like ProfileService know that a player is removing
            // when a profile is released.
            player.SetAttribute("PlayerRemoving", true);
            playerProfile.Release();

            this.playerEntities.delete(player);
            this.onEntityRemoving.Fire();
        }, true);

        const playerEntity = new PlayerEntity(player, janitor, playerProfile);
        this.playerEntities.set(player, playerEntity);

        // Call all connected lifecycle events
        debug.profilebegin("Lifecycle_Player_Join");
        for (const [id, event] of this.playerJoinEvents) {
            debug.profilebegin(id);
            Promise.defer(() => event.onPlayerJoin(playerEntity));
            debug.profileend();
        }
        debug.profileend();
    }

    /** Tell an entity to clean up when the player leaves */
    private onPlayerRemoving(player: Player) {
        const entity = this.playerEntities.get(player);
        if (!entity) return;
        entity.janitor.Destroy();
    }

    public getEntity(player: Player): PlayerEntity | undefined {
        return this.playerEntities.get(player);
    }

    /**
     * This method wraps a callback and replaces the first argument (that must be of type
     * `Player`) with that players `PlayerEntity` class.
     */
    public withPlayerEntity<T extends Array<unknown>, R = void>(fn: (playerEntity: PlayerEntity, ...args: T) => R) {
        // eslint-disable-next-line consistent-return
        return (player: Player, ...args: T): R | undefined => {
            const entity = this.getEntity(player);
            if (entity) return fn(entity, ...args);

            Log.Error(`No entity for player {@Player}, cannot continue to callback`, player);
        };
    }
}
