import { Controller, OnStart, OnInit, Reflect, Flamework } from "@flamework/core";
import Log from "@rbxts/log";
import { DecoratorMetadata } from "types/interfaces/flamework";
import { IInteractionConfig, Interaction, OnInteracted } from "./interactions-decorator";

type Ctor = OnInteracted;

interface IInteractionInfo {
    ctor: Ctor;
    config: IInteractionConfig;
    identifier: string;
}

const interactionKey = `flamework:decorators.${Flamework.id<typeof Interaction>()}`;

@Controller({})
export default class InteractionsController implements OnStart, OnInit {
    private registeredInteractions = new Map<Ctor, IInteractionInfo>();

    /** @hidden */
    public onInit(): void {
        // Register all classes decorated as an Interaction
        for (const [ctor, identifier] of Reflect.objToId) {
            const config = Reflect.getOwnMetadata<DecoratorMetadata<IInteractionConfig>>(ctor, interactionKey)
                ?.arguments[0];

            if (config) {
                if (!Flamework.implements<OnInteracted>(ctor))
                    return Log.Warn(`Class "{Identifier}" does not implement OnInteracted`, identifier);

                this.registeredInteractions.set(ctor, { ctor, config, identifier });
                Log.Debug(`Registered interaction with tag "{Tag}" ({Identifier})`, config.tag, identifier);
            }
        }
    }

    /** @hidden */
    public onStart(): void {}
}
