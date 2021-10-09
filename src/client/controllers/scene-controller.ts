import { Controller, OnStart } from "@flamework/core";
import Log from "@rbxts/log";
import Signal from "@rbxts/signal";
import { ClientStore } from "client/rodux/rodux";
import { Scene } from "types/enum/scene";

@Controller({})
export default class SceneController implements OnStart {
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
        Log.Debug("New scene: {Scene}", newScene);
        this.OnSceneChanged.Fire(newScene, oldScene);
    }
}
