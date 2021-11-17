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
