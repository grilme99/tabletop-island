import { CollectionService } from "@rbxts/services";
import { t } from "@rbxts/t";
import Log from "shared/lib/logger";

const log = new Log();

/**
 * Adds all instances (now and in the future) to the passed set. Also removes
 * instances that have lost their tag.
 *
 * @param set The set to add instances to.
 * @param tag The CollectionService tag to attach this set to.
 * @param instanceGuard The guard to check all instances with tag against.
 */
export function attachSetToTag<T extends Instance>(set: Set<T>, tag: string, instanceGuard: t.check<T>) {
    function handleInstance(obj: Instance) {
        if (!instanceGuard(obj)) {
            log.AtWarning().Log(`Instance "${obj.GetFullName()}" cannot be added to array.`);
            return;
        }

        set.add(obj);
    }

    CollectionService.GetTagged(tag).forEach(handleInstance);
    CollectionService.GetInstanceAddedSignal(tag).Connect(handleInstance);
    CollectionService.GetInstanceRemovedSignal(tag).Connect((instance) => set.delete(instance as T));
}
