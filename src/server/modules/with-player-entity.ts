import { Dependency } from "@flamework/core";
import { PlayerService } from "server/services/player/player-service";
import Log from "shared/lib/logger";
import { IServerResponse } from "types/interfaces/network";
import PlayerEntity from "./classes/player-entity";

const log = new Log();
let playerService: PlayerService;

export default function withPlayerEntity<T extends Array<unknown>, R = void>(
    fn: (playerEntity: PlayerEntity, ...args: T) => R,
) {
    if (!playerService) playerService = Dependency<PlayerService>();

    return (player: Player, ...args: T) => {
        const entity = playerService.getEntity(player);
        if (entity) return fn(entity, ...args);

        log.AtError().Log(
            `Unable to find entity for player "${player}", unable to call callback. Stacktrace: \n${debug.traceback()}`,
        );

        return identity<IServerResponse>({
            success: false,
            error: "Internal error",
        });
    };
}
