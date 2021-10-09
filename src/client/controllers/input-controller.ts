import { Controller } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";

@Controller({})
export default class InputController {
    private characterInputEnabled = true;
    private localPlayer = Players.LocalPlayer;

    /** This is async because it could yield when the character is still spawning */
    public async setCharacterInputsEnabled(enabled: boolean): Promise<void> {
        this.characterInputEnabled = enabled;

        // UserInputService.ModalEnabled was fixed as of Roblox version 481
        // https://developer.roblox.com/en-us/resources/release-note/Release-Notes-for-481
        UserInputService.ModalEnabled = !enabled;

        // This could yield if the character is still spawning
        const character = this.localPlayer.Character || this.localPlayer.CharacterAdded.Wait()[0];
        if (character) {
            // Set WalkSpeed and JumpPower if humanoid is present
            const humanoid = character.WaitForChild("Humanoid");
            if (humanoid && humanoid.IsA("Humanoid")) {
                // TODO: Define default speed/jump values somewhere in case these change
                humanoid.WalkSpeed = enabled ? 16 : 0;
                humanoid.JumpPower = enabled ? 50 : 0;
            }

            // Anchor character if there is a root part
            const rootPart = character.WaitForChild("HumanoidRootPart");
            if (rootPart && rootPart.IsA("BasePart")) {
                rootPart.Anchored = !enabled;
            }
        }
    }

    // Getters
    public getCharacterInputsEnabled(): boolean {
        return this.characterInputEnabled;
    }
}
