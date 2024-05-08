import { Store } from './Store';
import { Annotation } from '../model';

export type HoverState<T extends Annotation> = ReturnType<typeof createHoverState<T>>;
export declare const createHoverState: <T extends Annotation>(store: Store<T>) => {
    readonly current: string | undefined;
    subscribe: (this: void, run: import('svelte/store').Subscriber<string | undefined>, invalidate?: import('svelte/store').Invalidator<string | undefined> | undefined) => import('svelte/store').Unsubscriber;
    set: (this: void, value: string | undefined) => void;
};
//# sourceMappingURL=Hover.d.ts.map