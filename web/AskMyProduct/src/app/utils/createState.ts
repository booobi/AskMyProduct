import { state } from '@angular/animations';
import { BehaviorSubject, map } from 'rxjs';

export const createState = <T>(initialState: T) => {
  const state$ = new BehaviorSubject(initialState);
  const patchState = (statePatch: Partial<T>) => {
    state$.next({ ...state$.value, ...statePatch });
  };

  const select = (selector: (state: T) => any) => state$.pipe(map(selector));

  return { patchState, select };
};
