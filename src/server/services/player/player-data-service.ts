import { Dependency, Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Players } from "@rbxts/services";
import DefaultPlayerData, { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import KickCode from "types/enum/kick-reason";
import PlayerRemovalService from "./player-removal-service";

/**
 * This service handles everything to do with interfacing with Roblox datastores
 * and ProfileService for players. It should *not* be used directly and is consumed
 * by the `PlayerEntity` class.
 */
@Service({})
export default class PlayerDataService {
    private removalService = Dependency<PlayerRemovalService>();
    private gameProfileStore = ProfileService.GetProfileStore<IPlayerData>("PlayerData", DefaultPlayerData);

    public async loadPlayerProfile(player: Player): Promise<PlayerDataProfile | void> {
        const dataKey = tostring(player.UserId);
        const profile = this.gameProfileStore.LoadProfileAsync(dataKey, "ForceLoad");

        // The profile couldn't be loaded possibly due to otheR Roblox servers trying
        // to load this profile at the same time.
        if (profile === undefined) return this.removalService.removeForBug(player, KickCode.PlayerProfileUndefined);

        // The player left before the profile could be loaded
        if (!player.IsDescendantOf(Players)) profile.Release();

        // Fill in missing values from default data
        profile.Reconcile();

        // Listen for when the profile releases. This could be because it was loaded
        // on another server.
        profile.ListenToRelease(() => {
            if (!player.IsDescendantOf(game)) return;
            this.removalService.removeForBug(player, KickCode.PlayerProfileReleased);
        });

        return profile;
    }
}
