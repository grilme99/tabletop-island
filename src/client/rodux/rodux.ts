import Rodux from "@rbxts/rodux";
import { DataActions, dataReducer, IDataReducer } from "./reducers/data-reducer";
import { IGameReducer, GameActions, gameReducer } from "./reducers/game-reducer";

export interface IClientStore {
    gameState: IGameReducer;
    playerData: IDataReducer;
}
export type StoreActions = GameActions | DataActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
    gameState: gameReducer,
    playerData: dataReducer,
});

// This bypasses some type checks by using `never` but the Rodux package is really weird and fiddly.
// Should be fine, can revisit later.
export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {}, [
    Rodux.thunkMiddleware,
] as never);
