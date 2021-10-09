import { Networking } from "@flamework/networking";

// These events are listened to on the server, and called by the client.
interface ServerEvents {}

// These events are listened to on the client, and called by the server.
interface ClientEvents {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
