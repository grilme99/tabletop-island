import Log from "@rbxts/log";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";
import { MinigameMeta } from "shared/meta/minigame-meta";
import { MinigameId } from "types/enum/minigame";
import { Symbol } from "types/enum/symbol";
import { IMinigameMeta } from "types/interfaces/minigame-types";

function getMinigameMeta(obj: BasePart): IMinigameMeta | undefined {
    const minigameId = obj.GetAttribute("MinigameId") as MinigameId;
    if (!typeIs(minigameId, "string"))
        return Log.Warn("Minigame interaction {@Interaction} has no MinigameId attribute", obj) as never;

    const meta = MinigameMeta.get(minigameId);
    if (!meta) return Log.Warn("Minigame interaction {@Interaction} has invalid MinigameId attribute", obj) as never;

    return meta;
}

@Interaction({
    interactionId: "MinigameInteraction",
    objectText: (obj: BasePart) => {
        const meta = getMinigameMeta(obj);
        const max = meta?.players.max || Symbol.Infinity;
        return `0/${max} players`;
    },
    interactionText: "Start minigame",
})
export class MinigameInteraction implements OnInteracted {
    public onInteracted(obj: BasePart) {
        const meta = getMinigameMeta(obj);
        if (!meta) return;

        print("INTERACT");
    }
}
