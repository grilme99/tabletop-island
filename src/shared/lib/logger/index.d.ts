type MessageFuncType = () => LuaTuple<[string, unknown | undefined]>;

export const enum LogLevel {
    Trace,
    Debug,
    Info,
    Warning,
    Error,
    Fatal,
}

export const enum TimeUnit {
    Milliseconds,
    Seconds,
    Minutes,
    Hours,
    Days,
    Weeks,
    Months,
    Years,
}

interface LogItem {
    Every(n: number): LogItem;
    AtMostEvery(n: number, timeUnit: TimeUnit): LogItem;
    Throw(): LogItem;
    Log(message: string | Array<unknown> | { [key: string]: unknown } | MessageFuncType, customData?: unknown): void;
}

interface Log {
    At(level: LogLevel): LogItem;
    AtTrace(): LogItem;
    AtDebug(): LogItem;
    AtInfo(): LogItem;
    AtWarning(): LogItem;
    AtError(): LogItem;
    AtFatal(): LogItem;

    Assert(condition: boolean, ...args: unknown[]): void;
}

interface LogConstructor {
    new (): Log;
}

declare const Log: LogConstructor;
export default Log;
