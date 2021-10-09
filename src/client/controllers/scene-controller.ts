import { Controller, OnStart } from "@flamework/core";
import Signal from "@rbxts/signal";
import { ClientStore } from "client/rodux/rodux";
import Log from "shared/lib/logger";
import { Scene } from "types/enum/scene";

@Controller({})
export default class SceneController implements OnStart {
    private logger = new Log();

    public OnSceneChanged = new Signal<(newScene: Scene, oldScene?: Scene) => void>();

    public onStart(): void {
        // Run changed outside of event so that the initial state is captured
        this.onSceneChanged(ClientStore.getState().gameState.openScene);

        ClientStore.changed.connect((newState, oldState) => {
            if (newState.gameState.openScene !== oldState.gameState.openScene) {
                this.onSceneChanged(newState.gameState.openScene, oldState.gameState.openScene);
            }
        });
    }

    public getSceneEnteredSignal(scene: Scene): Signal {
        const sceneEntered = new Signal();
        this.OnSceneChanged.Connect((newScene) => {
            if (newScene === scene) sceneEntered.Fire();
        });
        return sceneEntered;
    }

    public setScene(scene: Scene): void {
        ClientStore.dispatch({ type: "SetScene", scene });
    }

    /** Handles updating  */
    private onSceneChanged(newScene: Scene, oldScene?: Scene) {
        this.logger.AtDebug().Log("New scene:", newScene);
        this.OnSceneChanged.Fire(newScene, oldScene);
    }
}
