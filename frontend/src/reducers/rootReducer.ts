import { AnyAction, Reducer, combineReducers } from "redux";
import { routerReducer } from "connected-next-router";
import { HYDRATE } from "next-redux-wrapper";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  router: routerReducer,
});

const reducer: Reducer<AppState, AnyAction> = (state: any, action) => {
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
  return rootReducer(state, action);
};

export default reducer;

export type AppState = ReturnType<typeof rootReducer>;
