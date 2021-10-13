import { Players } from "@rbxts/services";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";

let clicked = false;

@Interaction({
    interactionId: "PlayerCharacter",
    interactionText: (obj: BasePart) => {
        const player = Players.GetPlayerFromCharacter(obj.Parent as Instance);
        return player?.DisplayName || obj.Name;
    },
    shouldShowInteraction: () => !clicked,
})
export class PlayerInteraction implements OnInteracted {
    public onInteracted(obj: BasePart) {
        print("Interacted with:", obj.GetFullName());
        clicked = true;
        // eslint-disable-next-line no-return-assign
        task.delay(1, () => (clicked = false));
    }
}
