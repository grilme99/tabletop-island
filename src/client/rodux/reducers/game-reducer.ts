import Llama from "@rbxts/llama";
import Roact from "@rbxts/roact";
import Rodux from "@rbxts/rodux";
import { MinigameId } from "types/enum/minigame";
import { Scene } from "types/enum/scene";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";
import { ActionAddItemToHotbar, ActionRemoveItemFromHotbar, ActionSelectHotbarItem } from "../actions/hotbar-actions";
import { ActionSetCurrentMinigame } from "../actions/minigame-actions";
import { ActionSetScene } from "../actions/scene-actions";

export interface IGameReducer {
    openScene: Scene;

    hotbar: {
        selectedItem: string | undefined;
        items: IHotbarItemInStore[];
    };

    minigame: {
        currentMinigame: MinigameId | undefined;
    };
}

const items: IHotbarItemInStore[] = new Array(3, "").map((_, i) => {
    return {
        id: tostring(i),
        imageId: "1235453245",
    };
});

const InitialState: IGameReducer = {
    openScene: Scene.World,

    hotbar: {
        selectedItem: Roact.None,
        items,
    },

    minigame: {
        currentMinigame: Roact.None,
    },
};

export type GameActions =
    | ActionSetScene

    // Hotbar actions
    | ActionAddItemToHotbar
    | ActionRemoveItemFromHotbar
    | ActionSelectHotbarItem

    // Minigame actions
    | ActionSetCurrentMinigame;

export const gameReducer = Rodux.createReducer<IGameReducer, GameActions>(InitialState, {
    SetScene: (state, action) => {
        return {
            ...state,
            openScene: action.scene,
        };
    },

    // Hotbar actions
    AddItemToHotbar: (state, action) => {
        const hotbarItems = state.hotbar.items;
        if (action.forcePosition) {
            hotbarItems.insert(action.forcePosition, action.item);
        } else {
            hotbarItems.push(action.item);
        }

        return Llama.Dictionary.mergeDeep(state, {
            hotbar: {
                items: hotbarItems,
            },
        });
    },
    RemoveItemFromHotbar: (state, { itemId }) => {
        const hotbarItems = state.hotbar.items;
        hotbarItems.remove(hotbarItems.findIndex((i) => i.id === itemId));

        return Llama.Dictionary.mergeDeep(state, {
            hotbar: {
                items: hotbarItems,
            },
        });
    },
    DO_NOT_USE_SelectHotbarItem: (state, { itemId }) => {
        return Llama.Dictionary.mergeDeep(state, {
            hotbar: {
                selectedItem: itemId,
            },
        });
    },

    // Minigame actions
    SetCurrentMinigame: (state, { newMinigame }) => {
        return Llama.Dictionary.mergeDeep(state, {
            minigame: {
                minigameId: newMinigame,
            },
        });
    },
});
