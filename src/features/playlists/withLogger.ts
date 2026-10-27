import type { Reducer } from 'react';
export const withLogger = <S, A>(reducer: Reducer<S, A>): Reducer<S, A> => (state, action) => {
  const next = reducer(state, action); if (import.meta.env.DEV) console.log(action, state, next); return next;
};
