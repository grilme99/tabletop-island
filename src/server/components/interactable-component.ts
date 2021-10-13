import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { PhysicsService } from "@rbxts/services";
import { CollisionGroup } from "types/enum/collision-groups";
import { Tag } from "types/enum/tags";

PhysicsService.CreateCollisionGroup(CollisionGroup.Interactable);
PhysicsService.CollisionGroupSetCollidable("Default", CollisionGroup.Interactable, false);
PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Character, CollisionGroup.Interactable, false);

@Component({
    tag: Tag.Interactable,
})
export default class InteractableComponent extends BaseComponent<{}, BasePart> implements OnStart {
    /** @hidden */
    public onStart(): void {
        PhysicsService.SetPartCollisionGroup(this.instance, CollisionGroup.Interactable);
    }
}
