import { OnStart, Service } from "@flamework/core";
import { CollectionService, PhysicsService } from "@rbxts/services";
import yieldForR15CharacterDescendants from "@rbxts/yield-for-character";
import { Events } from "server/events";
import PlayerEntity from "server/modules/classes/player-entity";
import { addToCollisionGroup } from "shared/util/physics-utils";
import { CollisionGroup } from "types/enum/collision-groups";
import { ICharacterAngle } from "types/interfaces/character";
import { OnPlayerJoin } from "./player/player-service";

const characterAnglesReplicationRate = 0.5;

PhysicsService.CreateCollisionGroup(CollisionGroup.Character);

@Service({})
export default class CharacterService implements OnPlayerJoin, OnStart {
    private characterAnglesBuffer = new Map<Player, ICharacterAngle>();

    /** @hidden */
    public onStart() {
        PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Character, CollisionGroup.Character, false);

        Events.setCharacterLookAngles.connect((p, pitch, yaw) => this.onPlayerSetCharacterAngles(p, pitch, yaw));
        task.defer(() => {
            while (task.wait(characterAnglesReplicationRate)) this.replicateCharacterAngles();
        });
    }

    /** @hidden */
    public onPlayerJoin(entity: PlayerEntity): void {
        const player = entity.instance;
        if (player.Character) this.characterAdded(player.Character);
        player.CharacterAdded.Connect((c) => this.characterAdded(c));
    }

    private characterAdded(character: Model) {
        CollectionService.AddTag(character, "PlayerCharacter");
        yieldForR15CharacterDescendants(character).then((c) => addToCollisionGroup(c, CollisionGroup.Character));
    }

    private onPlayerSetCharacterAngles(player: Player, pitch: number, yaw: number) {
        this.characterAnglesBuffer.set(player, {
            pitch: math.clamp(pitch, -1, 1),
            yaw: math.clamp(yaw, -1, 1),
        });
    }

    private replicateCharacterAngles() {
        Events.replicationCharacterLookAngles.broadcast(this.characterAnglesBuffer);
        this.characterAnglesBuffer.clear();
    }
}
