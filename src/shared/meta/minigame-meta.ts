import { Flamework } from "@flamework/core";
import { MinigameId } from "types/enum/minigame";
import { IMinigameMeta } from "types/interfaces/minigame-types";

export const MinigameMeta = new Map<MinigameId, IMinigameMeta>([
    [
        MinigameId.Jenga,
        {
            displayName: "Jenga",
            players: { min: 2 },
        },
    ],
]);

export type IMinigameArea = Model & {
    /** Part that world interactions are placed on for the minigame. */
    interaction: BasePart;
    /** Part that all tabletop games are placed on top of. */
    gameSurface: BasePart;
    /** Folder containing seats that characters are placed on. */
    seating: Folder;
    /** Miscellaneous decorations folder for anything without functional value. */
    decoration: Folder;
};

export const minigameAreaGuard = Flamework.createGuard<IMinigameArea>();
