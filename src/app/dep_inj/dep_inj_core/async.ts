import { types } from "util";

export function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof (obj as any).then === "function"
    );
}

type IfPromise<T, Yes, No> = T extends PromiseLike<infer _U> ? Yes : No;
export function ifPromiseThen<T, R>(
    value: T,
    thenFn: (value: Awaited<T>) => R
): IfPromise<T, Promise<R>, R> {
    if (types.isPromise(value)) {
        return (value as Promise<T>).then((resolved) =>
            thenFn(resolved as Awaited<T>)
        ) as IfPromise<T, Promise<R>, R>;
    } else {
        return thenFn(value as Awaited<T>) as IfPromise<T, Promise<R>, R>;
    }
}
