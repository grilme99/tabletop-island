declare interface PID {
	Reset(): void;
	Calculate(dt: number, setpoint: number, pv: number): number;
	SetMinMax(min: number, max: number): void;
	Debug(name: string, parent: Instance): void;
}

declare interface PIDConstructor {
	new (min: number, max: number, kp: number, kd: number, ki: number): PID;
}

declare const PID: PIDConstructor;
export = PID;
