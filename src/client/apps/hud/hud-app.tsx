import Roact from "@rbxts/roact";
import { App } from "client/controllers/app-controller";
import { Scene } from "types/enum/scene";

interface IProps {}

@App({
    name: "HudApp",
    requiredScenes: [Scene.World],
    ignoreGuiInset: true,
})
class HudApp extends Roact.PureComponent<IProps> {
    public render() {
        return <></>;
    }
}

export = HudApp;
