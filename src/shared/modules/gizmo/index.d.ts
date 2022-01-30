declare namespace Gizmo {
    export function setColor(color: BrickColor): void;
    export function setColor3(color: Color3): void;
    export function setOrigin(origin: Vector3): void;
    export function setTransparency(transparency: number): void;
    export function setLayer(layer: number): void;
    export function setScale(scale: number): void;
    export function reset(): void;

    export function drawBox(cframe: CFrame, size: Vector3): void;
    export function drawWireBox(cframe: CFrame, size: Vector3): void;

    export function drawSphere(cframe: CFrame, radius: number): void;
    export function drawWireSphere(cframe: CFrame, radius: number): void;

    export function drawPoint(position: Vector3): void;

    export function drawLine(from: Vector3, to: Vector3): void;
    export function drawArrow(from: Vector3, to: Vector3): void;

    export function clear(): void;
}

export = Gizmo;
