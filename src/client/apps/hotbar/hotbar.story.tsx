import Roact from "@rbxts/roact";
import { makeStory } from "shared/util/story-utils";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";
import { HotbarRoot } from "./components/hotbar-root";

// This is to fix a compatibility issue between Storybook and the roblox-ts RuntimeLib
table.clear(_G);

export = makeStory({
    controls: {
        itemCount: 4,
        selectedItem: 2,
    },
    stories: {
        Hotbar: ({ controls, setControls }) => {
            const items: IHotbarItemInStore[] = new Array(controls.itemCount, "").map((_, i) => {
                return {
                    id: tostring(i),
                    imageId: "1235453245",
                };
            });

            const selectedItem = controls.selectedItem ? items[controls.selectedItem - 1]?.id : undefined;

            return (
                <frame Size={new UDim2(1, 0, 0, 150)} BackgroundTransparency={1}>
                    <HotbarRoot
                        hotbarItems={items}
                        selectedItem={selectedItem}
                        onItemSelected={(itemId) => {
                            let id: number | undefined = tonumber(itemId)! + 1;
                            if (controls.selectedItem === id) id = 0;
                            setControls({ selectedItem: id });
                        }}
                    />
                </frame>
            );
        },
    },
});
