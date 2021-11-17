import Roact from "@rbxts/roact";
import { App } from "client/controllers/app-controller";
import { Scene } from "types/enum/scene";

interface IProps {}

@App({
    name: "HotbarApp",
    requiredScenes: [Scene.World],
    ignoreGuiInset: true,
})
class HotbarApp extends Roact.PureComponent<IProps> {
    public render() {
        return <></>;
    }
}

export = HotbarApp;
