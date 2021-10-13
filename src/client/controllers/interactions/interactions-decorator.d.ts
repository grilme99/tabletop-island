import { IClientStore } from "client/rodux/rodux";
import { ClassDecorator } from "types/interfaces/flamework";

export interface IInteractionConfig {
    /** `InteractionId` attribute to connect this interaction to. */
    interactionId: string;
    /** String to show  next to interaction keycode. */
    interactionText: string | ((obj: BasePart) => string);
    /** String to show above interaction text. */
    objectText?: string | ((obj: BasePart) => string);
    /** Callback for deciding if the interaction should be shown. */
    shouldShowInteraction?: (obj: BasePart, state: IClientStore) => boolean;

    keyboardKeyCode?: Enum.KeyCode;
    gamepadKeycode?: Enum.KeyCode;
    maxDistance?: number;
    requireLineOfSight?: boolean;
    uiOffset?: Vector2;
    holdDuration?: number;

    /** List of interactions to display when the user interactions with the initial button. */
    // subInteractions?: string[];
}

export interface OnInteracted {
    /**
     * Called when the player interacts.
     * @param obj Instance the player interacted with.
     */
    onInteracted(obj: BasePart): void;
}

export declare function Interaction(opts: IInteractionConfig): ClassDecorator;
