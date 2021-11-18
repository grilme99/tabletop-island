import Roact from "@rbxts/roact";
import { makeStory } from "shared/util/story-utils";
import { ObjectViewport } from "./object-viewport";

// This is to fix a compatibility issue between Storybook and the roblox-ts RuntimeLib
table.clear(_G);

export = makeStory({
    controls: {},
    stories: {
        "Object Viewport": () => {
            const instance = new Instance("Part");
            instance.Size = new Vector3(30, 1, 4);

            return (
                <ObjectViewport
                    nativeProps={{
                        AnchorPoint: new Vector2(0.5, 0.5),
                        Position: UDim2.fromScale(0.5, 0.5),
                        Size: UDim2.fromOffset(300, 300),
                        BackgroundColor3: new Color3(0.2, 0.2, 0.2),
                        BorderSizePixel: 0,
                    }}
                    instance={instance}
                    extraCameraDepth={1}
                />
            );
        },
    },
});
