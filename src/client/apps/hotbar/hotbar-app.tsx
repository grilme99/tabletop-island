import Roact from "@rbxts/roact";
import { App } from "client/controllers/app-controller";
import { IClientStore } from "client/rodux/rodux";
import { Scene } from "types/enum/scene";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";
import { HotbarRoot } from "./components/hotbar-root";

interface IProps {
    hotbarItems: IHotbarItemInStore[];
    selectedItem: string | undefined;
}

@App({
    name: "HotbarApp",
    requiredScenes: [Scene.World],
    ignoreGuiInset: true,
    mapStateToProps: (state: IClientStore) => {
        return identity<IProps>({
            hotbarItems: state.gameState.hotbar.items,
            selectedItem: state.gameState.hotbar.selectedItem,
        });
    },
})
class HotbarApp extends Roact.PureComponent<IProps> {
    public render() {
        return (
            <HotbarRoot
                hotbarItems={this.props.hotbarItems}
                selectedItem={this.props.selectedItem}
                onItemSelected={() => {}}
            />
        );
    }
}

export = HotbarApp;
