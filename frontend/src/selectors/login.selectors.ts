import { AppState } from "@reducers/rootReducer";
import decode from "jwt-decode";

export function getToken(state: AppState) {
  return state.auth.token;
}

export function isAdmin(state: AppState) {
  const { token } = state.auth;
  if (token) {
    const data: any = decode(token);
    return data.role === "Admin";
  }
  return false;
}

export function hasLoginError(state: AppState) {
  return state.auth.error;
}

export function isLoggedIn(state: AppState) {
  return getToken(state) !== "" && !hasLoginError(state);
}
