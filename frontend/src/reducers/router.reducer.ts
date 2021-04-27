import { RouterState } from "connected-next-router/types";
import { AnyAction, combineReducers, Reducer } from "redux";
// @ts-ignore
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
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
