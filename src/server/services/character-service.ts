import { OnStart, Service } from "@flamework/core";
import { CollectionService, PhysicsService } from "@rbxts/services";
import yieldForR15CharacterDescendants from "@rbxts/yield-for-character";
import { Events } from "server/events";
import PlayerEntity from "server/modules/classes/player-entity";
import { addToCollisionGroup } from "shared/util/physics-utils";
import { CollisionGroup } from "types/enum/collision-groups";
import { Tag } from "types/enum/tags";
import { ICharacterAngle } from "types/interfaces/character";
import { OnPlayerJoin } from "./player/player-service";

const characterAnglesReplicationRate = 0.5;

PhysicsService.CreateCollisionGroup(CollisionGroup.Character);

/**
 * Much of the logic here is taken from MaximumADHD's CharacterRealism system.
 * https://github.com/MaximumADHD/Character-Realism/blob/main/RealismClient/init.client.lua
 *
 * I have made some optimizations here, such as replicating a buffer of character angles from the server
 * once, rather than one event per character. The original implementation could allow an exploiter to
 * fire a huge amount of events to each client.
 *
 * TODO: Actually complete character look at stuff
 */
@Service({})
export default class CharacterService implements OnPlayerJoin, OnStart {
    private characterAnglesBuffer = new Map<Player, ICharacterAngle>();

    /** @hidden */
    public onStart() {
        PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Character, CollisionGroup.Character, false);

        Events.setCharacterLookAngles.connect((p, pitch, yaw) => this.onPlayerSetCharacterAngles(p, pitch, yaw));
        task.defer(() => {
            while (task.wait(characterAnglesReplicationRate)) this.replicateCharacterAngles();
        });
    }

    /** @hidden */
    public onPlayerJoin(entity: PlayerEntity): void {
        const player = entity.instance;
        if (player.Character) this.characterAdded(player.Character);
        player.CharacterAdded.Connect((c) => this.characterAdded(c));
    }

    private async characterAdded(_c: Model) {
        const character = await yieldForR15CharacterDescendants(_c);
        addToCollisionGroup(character, CollisionGroup.Character);
        CollectionService.AddTag(character, Tag.PlayerCharacter);

        // const neck = character.Head.Neck;
        // neck.SetAttribute("OriginalC0", neck.C0);
        // const waist = character.UpperTorso.Waist;
        // waist.SetAttribute("OriginalC0", waist.C0);
    }

    private onPlayerSetCharacterAngles(player: Player, pitch: number, yaw: number) {
        this.characterAnglesBuffer.set(player, {
            pitch: math.clamp(pitch, -1, 1),
            yaw: math.clamp(yaw, -1, 1),
        });
    }

    private replicateCharacterAngles() {
        Events.replicationCharacterLookAngles.broadcast(this.characterAnglesBuffer);
        this.characterAnglesBuffer.clear();
    }
}
