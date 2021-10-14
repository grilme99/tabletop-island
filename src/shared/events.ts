import { Networking } from "@flamework/networking";
import { ICharacterAngle } from "types/interfaces/character";

// These events are listened to on the server, and called by the client.
interface ServerEvents {
    setCharacterLookAngles(pitch: number, yaw: number): void;
}

// These events are listened to on the client, and called by the server.
interface ClientEvents {
    replicationCharacterLookAngles(angles: Map<Player, ICharacterAngle>): void;
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
