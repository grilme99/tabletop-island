import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";
import { HotbarItem } from "./hotbar-item";

interface IProps {
    hotbarItems: IHotbarItemInStore[];
    selectedItem: string | undefined;
    onItemSelected: (itemId: string) => void;
}

const InnerHotbarRoot: Hooks.FC<IProps> = (props) => {
    return (
        <frame
            AnchorPoint={new Vector2(0.5, 1)}
            Position={new UDim2(0.5, 0, 1, -20)}
            Size={new UDim2(1, 0, 0, 60)}
            BackgroundTransparency={1}
        >
            <uilistlayout
                FillDirection={Enum.FillDirection.Horizontal}
                HorizontalAlignment={Enum.HorizontalAlignment.Center}
                VerticalAlignment={Enum.VerticalAlignment.Bottom}
                SortOrder={Enum.SortOrder.LayoutOrder}
                Padding={new UDim(0, 30)}
            />

            {props.hotbarItems.map((item, i) => (
                <HotbarItem
                    Key={item.id}
                    index={i}
                    meta={item}
                    selected={props.selectedItem === item.id}
                    onSelected={() => props.onItemSelected(item.id)}
                />
            ))}
        </frame>
    );
};

export const HotbarRoot = new Hooks(Roact)(InnerHotbarRoot, {
    componentType: "PureComponent",
    defaultProps: {},
});
