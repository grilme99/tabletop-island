/**
 * Safely call core methods because they could be called before registered
 * https://devforum.roblox.com/t/resetbuttoncallback-has-not-been-registered-by-the-corescripts/78470/8
 */
declare function CoreCall<T extends InstanceMethodNames<StarterGui>>(
    method: T,
    ...args: Parameters<StarterGui[T]>
): void;

export = CoreCall;
