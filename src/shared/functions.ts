import { Networking } from "@flamework/networking";
import { IServerResponse } from "types/interfaces/network-types";
import { IPlayerData } from "./meta/default-player-data";

// These events are listened to on the server, and called by the client.
interface ServerFunctions {
    requestPlayerData(): IServerResponse<IPlayerData>;
}

// These events are listened to on the client, and called by the server.
interface ClientFunctions {}

export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
