import { Networking } from "@flamework/networking";

// These events are listened to on the server, and called by the client.
interface ServerFunctions {}

// These events are listened to on the client, and called by the server.
interface ClientFunctions {}

export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
