import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import yieldForR15CharacterDescendants, { CharacterRigR15 } from "@rbxts/yield-for-character";

const player = Players.LocalPlayer;

/**
 * Much of the logic here is taken from MaximumADHD's CharacterRealism system.
 * https://github.com/MaximumADHD/Character-Realism/blob/main/RealismClient/init.client.lua
 *
 * I have made some optimizations here, such as replicating a buffer of character angles from the server
 * once, rather than one event per character. The original implementation could allow an exploiter to
 * fire a huge amount of events to each client.
 *
 * TODO: Actually complete character look at stuff
 */
@Controller({
    loadOrder: 999999, // Try to make this run last
})
export default class CharacterController implements OnStart {
    public readonly onCharacterAdded = new Signal<(character: CharacterRigR15) => void>();

    private currentCharacter?: CharacterRigR15;

    /** @hidden */
    public onStart(): void {
        if (player.Character) this.onCharacterAddedCallback(player.Character);
        player.CharacterAdded.Connect((c) => this.onCharacterAddedCallback(c));

        // eslint-disable-next-line no-return-assign
        player.CharacterRemoving.Connect(() => (this.currentCharacter = undefined));
    }

    public getCurrentCharacter() {
        return this.currentCharacter;
    }

    private async onCharacterAddedCallback(model: Model) {
        const character = await yieldForR15CharacterDescendants(model);
        this.currentCharacter = character;

        this.onCharacterAdded.Fire(character);
    }
}
