import Roact from "@rbxts/roact";
import { App } from "client/controllers/app-controller";
import { Scene } from "types/enum/scene";

interface IProps {}

@App({
    name: "CurrencyApp",
    requiredScenes: [Scene.World],
    ignoreGuiInset: true,
})
class CurrencyApp extends Roact.PureComponent<IProps> {
    public render() {
        return <></>;
    }
}

export = CurrencyApp;
