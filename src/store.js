// @flow strict

import type {Dispatch, Store} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import type {ThunkDispatch, ThunkAction} from 'redux-thunk';
import thunk from 'redux-thunk';

type IncrementAction = {
  type: 'INCREMENT_COUNTER',
  payload: number
};

const reducer = <A: IncrementAction >(state: number = 0, action: A): number => {
  switch(action.type){
    case 'INCREMENT_COUNTER': {
      return state + action.payload
    }
    default: {
      return state;
    }
  }
}

type State = number;
type Action = IncrementAction;
type Extra = {step: number};

const store: Store<
  number, 
  IncrementAction, 
  ThunkDispatch<State, Extra, Action>
> = createStore(
  reducer,
  applyMiddleware(
    thunk.withExtraArgument({step: 2})
  )
);

const increment = (step: number): IncrementAction => ({
  type: 'INCREMENT_COUNTER',
  payload: step
});

const thunkIncrement = (dispatch, getState, extraArgument) => {
  return dispatch(increment(extraArgument.step))
};

const asyncThunkIncrement = async (dispatch, getState, extraArgument) => {
  return dispatch(increment(extraArgument.step));
};

const doubleApply = actionCreator => (dispatch) => {
  return Promise.all([
    dispatch(actionCreator),
    dispatch(actionCreator)
  ]);
};

(async () => {
  const syncReturn: IncrementAction  = store.dispatch(increment(3));
  console.log(syncReturn, store.getState());

  const thunkReturn: IncrementAction  = store.dispatch(thunkIncrement)
  console.log(thunkReturn, store.getState());

  const asyncThunkReturn: Promise<IncrementAction> = store.dispatch(asyncThunkIncrement);
  console.log(await asyncThunkReturn, store.getState());

  const doubleReturn: Promise<Array<IncrementAction & Action>> = store.dispatch(doubleApply(asyncThunkIncrement));
  console.log(await doubleReturn, store.getState());
})()
