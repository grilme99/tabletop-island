interface IServerResponseOk<T> {
    success: true;
    data?: T;
}

interface IServerResponseBad {
    success: false;
    error: string;
}

export type IServerResponse<T = void> = IServerResponseOk<T> | IServerResponseBad;
