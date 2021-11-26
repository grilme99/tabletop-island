import Rodux from "@rbxts/rodux";
import { MinigameId } from "types/enum/minigame";

export interface ActionSetCurrentMinigame extends Rodux.Action<"SetCurrentMinigame"> {
    newMinigame: MinigameId | undefined;
}
