import Roact from "@rbxts/roact";
import { StarterPlayer } from "@rbxts/services";
import { IStorybook } from "types/interfaces/story-types";

const StarterPlayerScripts = StarterPlayer.FindFirstChildOfClass("StarterPlayerScripts")!;
const apps = StarterPlayerScripts.FindFirstChild("TS")!.FindFirstChild("apps")!;

export = identity<IStorybook>({
    name: "Tabletop Island",
    storyRoots: [apps],
    roact: Roact,
});
