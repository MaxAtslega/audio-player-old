import { AnyAction, combineReducers, Reducer } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import { routerReducer } from "connected-next-router";
// @ts-ignore
import { HYDRATE } from "next-redux-wrapper";

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
  } else {
    return rootReducer(state, action);
  }
};

export default reducer;

export type AppState = ReturnType<typeof rootReducer>;
