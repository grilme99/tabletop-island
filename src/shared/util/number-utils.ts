/**
 * Remap 'n' from the old range (oldMin, oldMax) to the new range (min, max).
 * https://github.com/Sleitnick/RbxCookbook/blob/master/src/Map.lua
 */
export function mapNumber(n: number, oldMin: number, oldMax: number, min: number, max: number) {
    return min + (max - min) * ((n - oldMin) / (oldMax - oldMin));
}
