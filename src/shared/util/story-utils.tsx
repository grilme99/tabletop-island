import Roact from "@rbxts/roact";

export function makeStory<
    T extends {},
    P extends { controls: T; setControls: (newControls: Partial<T>) => void },
>(story: { controls: T; stories: { [key: string]: Roact.FunctionComponent<P> } }) {
    return story;
}
