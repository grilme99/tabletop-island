import { Janitor } from "@rbxts/janitor";
import { IPlayerData, PlayerDataProfile } from "shared/data/default-player-data";

export default class PlayerEntity {
    public readonly name: string;

    /** Proxy for `playerEntity.dataProfile.data`. */
    public readonly data: IPlayerData;

    /**
     * This class should handle *everything* to do with a specific player. This
     * includes things like their data and state.
     */
    constructor(
        /** Reference to the actual Player instance. */
        public readonly instance: Player,
        public readonly janitor: Janitor,
        public readonly dataProfile: PlayerDataProfile,
    ) {
        this.name = instance.Name;
        this.data = dataProfile.Data;
    }
}
