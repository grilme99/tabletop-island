declare namespace Draw {
	export function ray(
		ray: Ray,
		color?: Color3,
		parent?: Instance,
		meshDiameter?: number,
		diameter?: number,
	): BasePart;

	export function updateRay(part: BasePart, ray: Ray, color?: Color3): void;
}

export = Draw;
