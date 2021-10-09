import { OnStart, Service } from "@flamework/core";
import { CollectionService, PhysicsService } from "@rbxts/services";
import yieldForR15CharacterDescendants from "@rbxts/yield-for-character";
import PlayerEntity from "server/modules/classes/player-entity";
import { addToCollisionGroup } from "shared/util/physics-utils";
import { CollisionGroup } from "types/enum/collision-groups";
import { PlayerJoin } from "./player/player-service";

PhysicsService.CreateCollisionGroup(CollisionGroup.Character);

@Service({})
export default class CharacterService implements PlayerJoin, OnStart {
    /** @hidden */
    public onStart() {
        PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Character, CollisionGroup.Character, false);
    }

    /** @hidden */
    public onPlayerJoin(entity: PlayerEntity): void {
        const player = entity.instance;

        if (player.Character) this.characterAdded(player.Character);
        player.CharacterAdded.Connect((c) => this.characterAdded(c));
    }

    private characterAdded(character: Model) {
        CollectionService.AddTag(character, "PlayerCharacter");

        yieldForR15CharacterDescendants(character).then((c) => addToCollisionGroup(c, CollisionGroup.Character));
    }
}
