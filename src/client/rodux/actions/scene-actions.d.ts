import Rodux from "@rbxts/rodux";
import { Scene } from "types/enum/scene";

export interface ActionSetScene extends Rodux.Action<"SetScene"> {
    scene: Scene;
}
