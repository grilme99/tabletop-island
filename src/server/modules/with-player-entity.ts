import { Dependency } from "@flamework/core";
import Log from "@rbxts/log";
import { PlayerService } from "server/services/player/player-service";
import { IServerResponse } from "types/interfaces/network";
import PlayerEntity from "./classes/player-entity";

let playerService: PlayerService;

export default function withPlayerEntity<T extends Array<unknown>, R = void>(
    fn: (playerEntity: PlayerEntity, ...args: T) => R,
) {
    if (!playerService) playerService = Dependency<PlayerService>();

    return (player: Player, ...args: T) => {
        const entity = playerService.getEntity(player);
        if (entity) return fn(entity, ...args);

        Log.Error(
            `Unable to find entity for player "{@Player}", unable to call callback. Stacktrace: \n{@Stacktrace}`,
            player,
            debug.traceback(),
        );

        return identity<IServerResponse>({
            success: false,
            error: "Internal error",
        });
    };
}
