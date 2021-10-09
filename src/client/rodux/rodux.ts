import Rodux from "@rbxts/rodux";
import { IGameReducer, GameActions, gameReducer } from "./reducers/game-reducer";

export interface IClientStore {
    gameState: IGameReducer;
}
export type StoreActions = GameActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
    gameState: gameReducer,
});

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {});
