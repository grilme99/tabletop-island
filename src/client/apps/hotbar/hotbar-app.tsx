import Roact from "@rbxts/roact";
import { App, StoreDispatch } from "client/controllers/app-controller";
import { IClientStore } from "client/rodux/rodux";
import { hotbarSelectItem } from "client/rodux/thunks/hotbar/select-item";
import { Scene } from "types/enum/scene";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";
import { HotbarRoot } from "./components/hotbar-root";

interface IStateProps {
    hotbarItems: IHotbarItemInStore[];
    selectedItem: string | undefined;
}

interface IDispatchProps {
    onItemSelected: (itemId: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

@App({
    name: "HotbarApp",
    requiredScenes: [Scene.World],
    ignoreGuiInset: true,
    mapStateToProps: (state: IClientStore) => {
        return identity<IStateProps>({
            hotbarItems: state.gameState.hotbar.items,
            selectedItem: state.gameState.hotbar.selectedItem,
        });
    },
    mapDispatchToProps: (dispatch: StoreDispatch) => {
        return identity<IDispatchProps>({
            onItemSelected: (itemId: string) => {
                dispatch(hotbarSelectItem(itemId) as never);
            },
        });
    },
})
class HotbarApp extends Roact.PureComponent<IProps> {
    public render() {
        return (
            <HotbarRoot
                hotbarItems={this.props.hotbarItems}
                selectedItem={this.props.selectedItem}
                onItemSelected={(itemId) => this.props.onItemSelected(itemId)}
            />
        );
    }
}

export = HotbarApp;
