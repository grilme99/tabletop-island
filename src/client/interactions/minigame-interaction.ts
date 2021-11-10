import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";

@Interaction({
    interactionId: "MinigameInteraction",
    interactionText: "Some Interaction",
})
export class MinigameInteraction implements OnInteracted {
    public onInteracted(obj: BasePart) {}
}
