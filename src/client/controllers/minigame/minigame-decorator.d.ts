import { MinigameId } from "types/enum/minigame";
import { ClassDecorator } from "types/interfaces/flamework";

export interface IMinigameConfig {
    minigameId: MinigameId;
}

export declare function Minigame(opts: IMinigameConfig): ClassDecorator;

export interface OnMinigameStart {
    onStart(): void;
}

export interface OnMinigameEnd {
    onEnd(): void;
}
