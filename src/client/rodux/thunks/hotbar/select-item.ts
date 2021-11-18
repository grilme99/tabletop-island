import Roact from "@rbxts/roact";
import { ClientStore } from "client/rodux/rodux";

/**
 * Select an item on the hotbar via its ID and update hotbar item
 * handlers of this change via the hotbar controller.
 *
 * This should be used over the `DO_NOT_USE_SelectHotbarItem` action
 * because it handles updating hotbar item handlers *and* updates
 * UI that consumes the hotbar state.
 */
export function hotbarSelectItem(itemId: string | undefined) {
    return (store: typeof ClientStore) => {
        const currentState = store.getState();

        const itemAlreadySelected = currentState.gameState.hotbar.selectedItem === itemId;
        const finalItemId = itemAlreadySelected ? Roact.None : itemId;

        // Reflect this update on UI with the internal action.
        store.dispatch({ type: "DO_NOT_USE_SelectHotbarItem", itemId: finalItemId });
    };
}
