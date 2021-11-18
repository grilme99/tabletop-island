import { CoreHooks } from "@rbxts/roact-hooks";

export function useMountEffect(callback: Callback, { useEffect }: CoreHooks) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(callback, []);
}
