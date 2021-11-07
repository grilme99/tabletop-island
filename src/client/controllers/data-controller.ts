import { Controller, OnStart } from "@flamework/core";
import Log from "@rbxts/log";
import { Events, Functions } from "client/events";
import { ClientStore } from "client/rodux/rodux";
import { IPlayerData } from "shared/data/default-player-data";

/**
 * Controller than handles receiving player data updates from the server. Also
 * requests the players data on load.
 */
@Controller({})
export default class DataController implements OnStart {
    /** @hidden */
    public onStart(): void {
        Events.playerDataChanged.connect((n) => this.onGotNewData(n));

        // Request initial player data from the server
        Functions.requestPlayerData().then((res) => {
            if (!res.success)
                return Log.Error("Could not get initial player data from server because:\n{@Reason}", res.error);

            this.onGotNewData(res.data);
        });
    }

    private onGotNewData(newPlayerData: Partial<IPlayerData>) {
        Log.Verbose("Got new player data from server {@Data}", newPlayerData);
        ClientStore.dispatch({ type: "SetPlayerData", newPlayerData });
    }
}
