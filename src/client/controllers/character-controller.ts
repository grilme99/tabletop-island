import { Controller, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import yieldForR15CharacterDescendants, { CharacterRigR15 } from "@rbxts/yield-for-character";

const player = Players.LocalPlayer;

@Controller({})
export default class CharacterController implements OnInit {
    private currentCharacter?: CharacterRigR15;

    /** @hidden */
    public onInit(): void {
        if (player.Character) this.onCharacterAdded(player.Character);
        player.CharacterAdded.Connect((c) => this.onCharacterAdded(c));

        // eslint-disable-next-line no-return-assign
        player.CharacterRemoving.Connect(() => (this.currentCharacter = undefined));
    }

    public getCurrentCharacter() {
        return this.currentCharacter;
    }

    private async onCharacterAdded(model: Model) {
        const character = await yieldForR15CharacterDescendants(model);
        this.currentCharacter = character;
    }
}
