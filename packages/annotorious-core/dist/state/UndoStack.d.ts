import { ChangeSet } from './StoreObserver';
import { Store } from './Store';
import { Annotation } from '../model';
import { Unsubscribe } from 'nanoevents';

export interface UndoStack<T extends Annotation> {
    canRedo(): boolean;
    canUndo(): boolean;
    destroy(): void;
    on<E extends keyof UndoStackEvents<T>>(event: E, callback: UndoStackEvents<T>[E]): Unsubscribe;
    undo(): void;
    redo(): void;
}
export interface UndoStackEvents<T extends Annotation> {
    redo(change: ChangeSet<T>): void;
    undo(change: ChangeSet<T>): void;
}
export declare const createUndoStack: <T extends Annotation>(store: Store<T>) => UndoStack<T>;
//# sourceMappingURL=UndoStack.d.ts.map