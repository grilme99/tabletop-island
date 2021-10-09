export interface DecoratorMetadata<T> {
    arguments: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDecorator = (ctor: any) => any;
