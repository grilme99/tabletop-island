import Rodux from "@rbxts/rodux";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";

export interface ActionAddItemToHotbar extends Rodux.Action<"AddItemToHotbar"> {
    item: IHotbarItemInStore;
    forcePosition?: number;
}

export interface ActionRemoveItemFromHotbar extends Rodux.Action<"RemoveItemFromHotbar"> {
    itemId: string;
}

export interface ActionSelectHotbarItem extends Rodux.Action<"DO_NOT_USE_SelectHotbarItem"> {
    itemId: string | undefined;
}
