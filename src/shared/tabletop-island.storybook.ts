import Roact from "@rbxts/roact";
import { StarterPlayer } from "@rbxts/services";
import { IStorybook } from "types/interfaces/story-types";

const StarterPlayerScripts = StarterPlayer.FindFirstChildOfClass("StarterPlayerScripts")!;
const apps = StarterPlayerScripts.FindFirstChild("TS")!.FindFirstChild("apps")!;

const components = script.Parent!.FindFirstChild("ui")!.FindFirstChild("components")!;

export = identity<IStorybook>({
    name: "Tabletop Island",
    storyRoots: [apps, components],
    roact: Roact,
});
