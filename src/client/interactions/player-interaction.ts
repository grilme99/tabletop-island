import { Players } from "@rbxts/services";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";

const enum IPlayerInteraction {
    InviteToGroup = "Invite To Group",
    Mute = "Mute",
}

@Interaction({
    tag: "PlayerCharacter",
    interactionContext: (obj: BasePart) => {
        const player = Players.GetPlayerFromCharacter(obj.Parent as Instance);
        return player?.DisplayName || obj.Name;
    },
    subInteractions: [IPlayerInteraction.InviteToGroup, IPlayerInteraction.Mute],
})
export class PlayerInteraction implements OnInteracted {
    public onInteracted(obj: BasePart, interaction: IPlayerInteraction) {
        print("Interacted with:", interaction, "on:", obj.GetFullName());
    }
}
