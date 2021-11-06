import Rodux from "@rbxts/rodux";
import DefaultPlayerData, { IPlayerData } from "shared/data/default-player-data";
import { ActionSetPlayerData } from "../actions/data-actions";

export type IDataReducer = IPlayerData;

const InitialState: IDataReducer = DefaultPlayerData;

export type DataActions = ActionSetPlayerData;

export const dataReducer = Rodux.createReducer<IDataReducer, DataActions>(InitialState, {
    SetPlayerData: (oldPlayerData, action) => {
        return {
            ...oldPlayerData,
            ...action.newPlayerData,
        };
    },
});
