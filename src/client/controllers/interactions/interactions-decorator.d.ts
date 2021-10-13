import { ClassDecorator } from "types/interfaces/flamework";

export interface IInteractionConfig {
    /** `InteractionId` attribute to connect this interaction to. */
    interactionId: string;
    /** String to show next to interaction keycode. */
    interactionContext: string | ((obj: BasePart) => string);
    /** Callback for deciding if the interaction should be shown. */
    shouldShowInteraction?: (obj: BasePart) => boolean;
    /** List of interactions to display when the user interactions with the initial button. */
    subInteractions?: string[];
}

export interface OnInteracted {
    /**
     * Called when the player interacts.
     * @param obj Instance the player interacted with.
     * @param interaction The name of the interaction used (useful for sub interactions).
     */
    onInteracted(obj: BasePart, interaction: string): void;
}

export declare function Interaction(opts: IInteractionConfig): ClassDecorator;
