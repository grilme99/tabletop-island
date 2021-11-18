import Roact from "@rbxts/roact";

export interface IStorybook {
    name: string;
    storyRoots: Instance[];
    roact?: typeof Roact;
}
