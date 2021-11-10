import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {
    currency: {
        gamePoints: 0,
    },
};

export default DefaultPlayerData;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
