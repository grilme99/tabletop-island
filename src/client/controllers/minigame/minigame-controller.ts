/* eslint-disable max-classes-per-file */
import { Controller, OnStart, OnInit, Flamework, Reflect } from "@flamework/core";
import { Constructor } from "@flamework/core/out/types";
import Log from "@rbxts/log";
import { ClientStore } from "client/rodux/rodux";
import { IMinigameArea } from "shared/meta/minigame-meta";
import { MinigameId } from "types/enum/minigame";
import { DecoratorMetadata } from "types/interfaces/flamework";
import { IMinigameConfig, Minigame, OnMinigameEnd, OnMinigameStart } from "./minigame-decorator";

type Ctor = OnMinigameStart & OnMinigameEnd;

interface IMinigameInfo {
    ctor: Constructor<BaseMinigame> & Ctor;
    config: IMinigameConfig;
    identifier: string;
}

const decoratorKey = `flamework:decorators.${Flamework.id<typeof Minigame>()}`;

export class BaseMinigame {
    /** The minigame model that this handler is currently attached to. */
    public minigameArea!: IMinigameArea;
}

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

    /** Sets the currently active minigame in the Rodux store and updates minigame handlers */
    public setCurrentMinigame(newMinigame: MinigameId | undefined) {
        ClientStore.dispatch({ type: "SetCurrentMinigame", newMinigame });
    }

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

            this.registeredMinigames.set(identifier, {
                ctor: ctor as Constructor<BaseMinigame> & Ctor,
                config,
                identifier,
            });
            Log.ForScript().Verbose("Registered minigame class {Identifier}", identifier);
        }
    }

    private setupMinigameHandler() {}
}
