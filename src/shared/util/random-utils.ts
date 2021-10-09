export function fromList<T>(...objects: T[]): T {
    return objects[math.floor(math.random() * objects.size())];
}
