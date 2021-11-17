import { Flamework } from "@flamework/core";
import { IMinigameMeta } from "types/interfaces/minigame-types";

export const MinigameMeta = new Map<string, IMinigameMeta>([
    [
        "jenga",
        {
            displayName: "Jenga",
            players: { min: 2 },
        },
    ],
]);

export const minigameAreaGuard = Flamework.createGuard<
    Model & {
        /** Part that world interactions are placed on for the minigame. */
        interaction: BasePart;
        /** Part that all tabletop games are placed on top of. */
        gameSurface: BasePart;
        /** Folder containing seats that characters are placed on. */
        seating: Folder;
        /** Miscellaneous decorations folder for anything without functional value. */
        decoration: Folder;
    }
>();
