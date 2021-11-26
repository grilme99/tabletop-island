declare namespace Oklab {
    export function to(rgb: Color3): Vector3;

    export function from(lab: Vector3, unclamped?: boolean): Color3;
}

export = Oklab;
