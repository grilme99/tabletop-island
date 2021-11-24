import { Controller, OnStart, OnInit } from "@flamework/core";
import { ContextActionService, TweenService, Workspace } from "@rbxts/services";
import CharacterController from "./character-controller";

const camera = Workspace.CurrentCamera!;
const tweenInfo = new TweenInfo(0.1, Enum.EasingStyle.Linear, Enum.EasingDirection.In);

const maxSpeed = 24;
const minSpeed = 16;

const maxFov = 80;
const minFov = 70;

const startSprintingState = Enum.UserInputState.Begin;
const stopSprintingState = Enum.UserInputState.End;

/**
 * Handles enabling/disabling sprint based on player input.
 * TODO: Allow other controllers to disable the ability to sprint.
 */
@Controller({})
export default class SprintController implements OnStart, OnInit {
    private isSprinting = false;

    constructor(private readonly characterController: CharacterController) {}

    /** @hidden */
    public onInit(): void {}

    /** @hidden */
    public onStart(): void {
        ContextActionService.BindAction(
            "Sprint",
            (_, s) => this.handleInput(s),
            true,
            Enum.KeyCode.LeftShift,
            Enum.KeyCode.RightShift,
        );

        this.characterController.onCharacterAdded.Connect(() => {
            if (!this.isSprinting) return;
            this.startSprinting();
        });
    }

    private handleInput(state: Enum.UserInputState) {
        if (state === startSprintingState) {
            this.startSprinting();
        } else if (state === stopSprintingState) {
            this.stopSprinting();
        }
    }

    private startSprinting() {
        const character = this.characterController.getCurrentCharacter();
        const humanoid = character?.Humanoid;
        if (!humanoid) return;

        humanoid.WalkSpeed = maxSpeed;
        this.isSprinting = true;

        this.updateFov(maxFov);
    }

    private stopSprinting() {
        const character = this.characterController.getCurrentCharacter();
        const humanoid = character?.Humanoid;
        if (!humanoid) return;

        humanoid.WalkSpeed = minSpeed;
        this.isSprinting = false;

        this.updateFov(minFov);
    }

    private updateFov(newFov: number) {
        TweenService.Create(camera, tweenInfo, { FieldOfView: newFov }).Play();
    }
}
