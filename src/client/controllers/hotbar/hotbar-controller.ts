import { Controller, OnStart, OnInit } from "@flamework/core";
import { ContextActionService } from "@rbxts/services";
import { ClientStore } from "client/rodux/rodux";
import { hotbarSelectItem } from "client/rodux/thunks/hotbar/select-item";

const startKeycodeValue = 49;
const hotbarKeycodes = [
    Enum.KeyCode.One,
    Enum.KeyCode.Two,
    Enum.KeyCode.Three,
    Enum.KeyCode.Four,
    Enum.KeyCode.Five,
    Enum.KeyCode.Six,
    Enum.KeyCode.Seven,
    Enum.KeyCode.Eight,
    Enum.KeyCode.Nine,
];

/**
 * Handles a couple of tasks. First, it selects hotbar items via keyboard input (1-9).
 * Second, it alerts hotbar items that they have been selected via the HotbarItem
 * decorator.
 */
@Controller({})
export default class HotbarController implements OnStart, OnInit {
    /** @hidden */
    public onInit(): void {}

    /** @hidden */
    public onStart(): void {
        ContextActionService.BindAction(
            "SelectHotbarItem",
            (_, s, i) => this.handleInput(s, i),
            false,
            ...hotbarKeycodes,
        );
    }

    private handleInput(state: Enum.UserInputState, input: InputObject) {
        if (state !== Enum.UserInputState.Begin) return;

        const keycode = input.KeyCode;
        const itemNumber = this.getItemNumberFromKeycode(keycode);

        const currentHotbarItems = ClientStore.getState().gameState.hotbar.items;
        const itemId = currentHotbarItems[itemNumber]?.id;

        if (itemId) ClientStore.dispatch(hotbarSelectItem(itemId) as never);
    }

    private getItemNumberFromKeycode(keycode: Enum.KeyCode) {
        const position = keycode.Value - startKeycodeValue;
        return position;
    }
}
