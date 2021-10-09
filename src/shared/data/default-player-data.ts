import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {};

export default DefaultPlayerData;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
