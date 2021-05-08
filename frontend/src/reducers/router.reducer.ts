import { RouterState } from "connected-next-router/types";
import { AnyAction, Reducer, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { routerReducer } from "connected-next-router";

export interface State {
  router: RouterState;
  routerEventCounts: any;
}

const combinedReducer = combineReducers({
  router: routerReducer,
});

const reducer: Reducer<State, AnyAction> = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== "undefined") {
      nextState.router = state.router;
    }
    return nextState;
  }
  return combinedReducer(state, action);
};

export default reducer;
