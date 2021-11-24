import { Controller, OnStart, OnInit, Flamework, Reflect } from "@flamework/core";
import Log from "@rbxts/log";
import { DecoratorMetadata } from "types/interfaces/flamework";
import { IMinigameConfig, Minigame, OnMinigameEnd, OnMinigameStart } from "./minigame-decorator";

type Ctor = OnMinigameStart & OnMinigameEnd;

interface IMinigameInfo {
    ctor: Ctor;
    config: IMinigameConfig;
    identifier: string;
}

const decoratorKey = `flamework:decorators.${Flamework.id<typeof Minigame>()}`;

@Controller({})
export default class MinigameController implements OnStart, OnInit {
    private registeredMinigames = new Map<string, IMinigameInfo>();

    /** @hidden */
    public onInit(): void {
        // Register all classes decorated as a minigame
        this.registerMinigameHandlers();
    }

    /** @hidden */
    public onStart(): void {}

    /** Use Flamework Reflection API to register all classes decorated as a minigame. */
    private registerMinigameHandlers() {
        for (const [ctor, identifier] of Reflect.objToId) {
            const config = Reflect.getOwnMetadata<DecoratorMetadata<IMinigameConfig>>(ctor, decoratorKey)?.arguments[0];
            if (!config) continue;

            if (!Flamework.implements<OnMinigameStart>(ctor)) {
                Log.ForScript().Warn("Class {Identifier} does not implement OnMinigameStart", identifier);
                continue;
            }

            if (!Flamework.implements<OnMinigameEnd>(ctor)) {
                Log.ForScript().Warn("Class {Identifier} does not implement OnMinigameEnd", identifier);
                continue;
            }

            this.registeredMinigames.set(identifier, { ctor, config, identifier });
            Log.ForScript().Verbose("Registered minigame class {Identifier}", identifier);
        }
    }
}
