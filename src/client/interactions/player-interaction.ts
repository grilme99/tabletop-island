import { Players } from "@rbxts/services";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";

@Interaction({
    interactionId: "PlayerCharacter",
    interactionText: (obj: BasePart) => {
        const player = Players.GetPlayerFromCharacter(obj.Parent as Instance);
        return player?.DisplayName || obj.Name;
    },
})
export class PlayerInteraction implements OnInteracted {
    public onInteracted(obj: BasePart) {
        print("Interacted with:", obj.GetFullName());
    }
}
