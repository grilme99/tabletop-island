import { Controller, Service, Reflect, Flamework } from "@flamework/core";

/** Helper which returns if an `object` is a Flamework Service */
export const isFlameworkService = (obj: object): boolean =>
    Reflect.hasMetadata(obj, `flamework:decorators.${Flamework.id<typeof Service>()}`);

/** Helper which returns if an `object` is a Flamework Controller */
export const isFlameworkController = (obj: object): boolean =>
    Reflect.hasMetadata(obj, `flamework:decorators.${Flamework.id<typeof Controller>()}`);
