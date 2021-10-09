import { Controller, OnStart } from "@flamework/core";
import coreCall from "shared/util/core-call";

@Controller({})
export default class CoreGuiController implements OnStart {
    public onStart(): void {
        this.disableCoreGui();
    }

    public disableCoreGui(): void {
        coreCall("SetCore", "TopbarEnabled", false);
        coreCall("SetCoreGuiEnabled", Enum.CoreGuiType.All, false);
    }

    public enableCoreGui(): void {
        coreCall("SetCoreGuiEnabled", Enum.CoreGuiType.Chat, true);
        coreCall("SetCoreGuiEnabled", Enum.CoreGuiType.EmotesMenu, true);
    }

    public setResetButtonEnabled(enabled: boolean): void {
        coreCall("SetCore", "ResetButtonCallback", enabled);
    }
}
