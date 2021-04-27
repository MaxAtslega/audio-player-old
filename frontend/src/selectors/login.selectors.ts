import { AppState } from "../reducers/rootReducer";

export function getToken(state: AppState) {
  return state.auth.token;
}

export function hasLoginError(state: AppState) {
  return state.auth.error;
}

export function isLoggedIn(state: AppState) {
  return getToken(state) !== "" && !hasLoginError(state);
}
