export interface IMinigameMeta {
    displayName: string;

    players: {
        min: number;
        max?: number;
    };
}
