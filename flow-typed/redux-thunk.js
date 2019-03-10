declare module 'redux-thunk' {

  declare type DispatchAPI<A> = (action: A) => A;
  declare type Dispatch<A: { type: string }> = DispatchAPI<A>;

  declare type MiddlewareAPI<S, A, D = Dispatch<A>> = {
  dispatch: D,
  getState(): S
  };

  declare type Middleware<S, A, D = Dispatch<A>> = (api: MiddlewareAPI<S, A, D>) => (next: D) => D;

  declare export type ThunkDispatch<S, E, A> = {
      <T>(action: T & A): T & A,
      <R>(asyncAction: ThunkAction<R, S, E, A>): R
  }

  declare export type ThunkAction<R, S, E, A> = (
      dispatch: ThunkDispatch<S, E, A>,
      getState: () => S,
      extraArgument: E
  ) => R;

  declare type ThunkMiddleware<E: {}> = {
    <S, A, D>(api: MiddlewareAPI<S, A, D>): (next: D) => D
  };

  declare module.exports: {
    withExtraArgument<E>(extraArgument: E): ThunkMiddleware<E>
  };

}
