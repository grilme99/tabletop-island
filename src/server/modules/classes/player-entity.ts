import { Janitor } from "@rbxts/janitor";
import Log from "@rbxts/log";
import { IPlayerData, PlayerDataProfile } from "shared/data/default-player-data";
import { DeepReadonly } from "types/util/readonly";

export default class PlayerEntity {
    public readonly name: string;

    /**
     * Readonly version of the players data. Updates should be done through the
     * `updateData` method.
     */
    public data: DeepReadonly<IPlayerData>;

    /**
     * This class should handle *everything* to do with a specific player. This
     * includes things like their data and state.
     */
    constructor(
        /** Reference to the actual Player instance. */
        public readonly player: Player,
        public readonly janitor: Janitor,
        private dataProfile: PlayerDataProfile,
    ) {
        this.name = player.Name;
        this.data = dataProfile.Data;
    }

    /**
     * Method used to update the players data and alert the client of data changes.
     * TODO: Alert the client of data changes.
     *
     * @param callback Callback that gets passed the players existing data and returns
     * their new data.
     */
    public updateData(callback: (existingData: DeepReadonly<IPlayerData>) => IPlayerData) {
        const currentData = this.dataProfile.Data;
        const newData = callback(currentData);
        this.dataProfile.Data = newData;
        this.data = newData;

        Log.Debug("Player data for {Player} updated to {@Data}", this.player, newData);
    }
}
