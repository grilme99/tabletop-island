import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/data/default-player-data";

export interface ActionSetPlayerData extends Rodux.Action<"SetPlayerData"> {
    newPlayerData: Partial<IPlayerData>;
}
