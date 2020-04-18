export type StateSideEffect<T> = {
  [K in keyof T]?: (a: T[K], b: T[K]) => void
};

export type StateSideEffectFactory<T> = (input: HTMLInputElement, redraw: () => void) => StateSideEffect<T>;
