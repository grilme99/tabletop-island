import Log from "@rbxts/log";
import { CollectionService } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { t } from "@rbxts/t";

/**
 * Adds all instances (now and in the future) to the passed set. Also removes
 * instances that have lost their tag.
 *
 * @param set The set to add instances to.
 * @param tag The CollectionService tag to attach this set to.
 * @param instanceGuard The guard to check all instances with tag against.
 */
export function attachSetToTag<T extends Instance>(set: Set<T>, tag: string, instanceGuard: t.check<T>) {
    const onAdded = new Signal<(obj: T) => void>();

    function handleInstance(obj: Instance) {
        if (!instanceGuard(obj)) {
            Log.Warn(`Instance "{@Instance}" cannot be added to array.`, obj.GetFullName());
            return;
        }

        set.add(obj);
        onAdded.Fire(obj);
    }

    CollectionService.GetTagged(tag).forEach(handleInstance);
    CollectionService.GetInstanceAddedSignal(tag).Connect(handleInstance);
    CollectionService.GetInstanceRemovedSignal(tag).Connect((instance) => set.delete(instance as T));

    return onAdded;
}
