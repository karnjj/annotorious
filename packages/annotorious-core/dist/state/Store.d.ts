import { Origin, StoreChangeEvent, StoreObserveOptions } from './StoreObserver';
import { Annotation } from '../model';

type AnnotationBodyIdentifier = {
    id: string;
    annotation: string;
};
export type Store<T extends Annotation> = ReturnType<typeof createStore<T>>;
export declare const createStore: <T extends Annotation>() => {
    addAnnotation: (annotation: T, origin?: Origin) => void;
    addBody: (body: T['bodies'][number], origin?: Origin) => void;
    all: () => T[];
    bulkAddAnnotation: (annotations: T[], replace?: boolean, origin?: Origin) => void;
    bulkDeleteAnnotation: (annotationsOrIds: (T | string)[], origin?: Origin) => void;
    bulkDeleteBodies: (bodies: AnnotationBodyIdentifier[], origin?: Origin) => void;
    bulkUpdateAnnotation: (annotations: T[], origin?: Origin) => void;
    bulkUpdateBodies: (bodies: Array<T['bodies'][number]>, origin?: Origin) => void;
    bulkUpdateTargets: (targets: Array<T['target']>, origin?: Origin) => void;
    clear: (origin?: Origin) => void;
    deleteAnnotation: (annotationOrId: T | string, origin?: Origin) => void;
    deleteBody: (body: AnnotationBodyIdentifier, origin?: Origin) => void;
    getAnnotation: (id: string) => T | undefined;
    getBody: (id: string) => T['bodies'][number] | undefined;
    observe: (onChange: {
        (event: StoreChangeEvent<T>): void;
    }, options?: StoreObserveOptions) => number;
    unobserve: (onChange: {
        (event: StoreChangeEvent<T>): void;
    }) => void;
    updateAnnotation: (arg1: string | T, arg2?: T | Origin, arg3?: Origin) => void;
    updateBody: (oldBodyId: AnnotationBodyIdentifier, newBody: T['bodies'][number], origin?: Origin) => void;
    updateTarget: (target: T['target'], origin?: Origin) => void;
};
export {};
//# sourceMappingURL=Store.d.ts.map