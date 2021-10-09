import { PhysicsService } from "@rbxts/services";

export function addToCollisionGroup(obj: Instance, group: string) {
    if (obj.IsA("BasePart")) PhysicsService.SetPartCollisionGroup(obj, group);
    obj.GetDescendants().forEach((i) => {
        if (i.IsA("BasePart")) PhysicsService.SetPartCollisionGroup(i, group);
    });
}

export function setNetworkOwner(obj: Instance, owner: Player | undefined) {
    if (obj.IsA("BasePart") && obj.CanSetNetworkOwnership()[0]) obj.SetNetworkOwner(owner);
    obj.GetDescendants().forEach((i) => {
        if (i.IsA("BasePart") && i.CanSetNetworkOwnership()[0]) i.SetNetworkOwner(owner);
    });
}
