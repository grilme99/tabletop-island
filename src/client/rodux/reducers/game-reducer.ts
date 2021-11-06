import Rodux from "@rbxts/rodux";
import { Scene } from "types/enum/scene";
import { ActionSetScene } from "../actions/scene-actions";

export interface IGameReducer {
    openScene: Scene;
}

const InitialState: IGameReducer = {
    openScene: Scene.World,
};

export type GameActions = ActionSetScene;

export const gameReducer = Rodux.createReducer<IGameReducer, GameActions>(InitialState, {
    SetScene: (state, action) => {
        return {
            ...state,
            openScene: action.scene,
        };
    },
});
