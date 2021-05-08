import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  loginErrorAction,
  loginSuccessAction,
  LOGOUT,
  logoutAction,
  REAUTHENTICATE,
  reauthenticateAction,
  UNAUTHORIZED_ERROR,
  unauthorizedErrorAction,
} from "@actions/auth.actions";
import * as cookie from "@utils/cookie";
import update from "immutability-helper";
import { ActionType } from "typesafe-actions";

export interface State {
  token: string;
  error: boolean;
}

export default function authReducer(
  state: State = { token: "", error: false },
  action: ActionType<
    | typeof loginSuccessAction
    | typeof loginErrorAction
    | typeof logoutAction
    | typeof reauthenticateAction
    | typeof unauthorizedErrorAction
  >
): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      cookie.setCookie("token", action.payload);
      return update(state, {
        token: { $set: action.payload },
        error: { $set: false },
      });
    case LOGIN_ERROR:
      return update(state, {
        token: { $set: "" },
        error: { $set: true },
      });
    case LOGOUT:
      cookie.removeCookie("token");
      return update(state, {
        token: { $set: "" },
        error: { $set: false },
      });
    case REAUTHENTICATE:
      return update(state, {
        token: { $set: action.payload },
        error: { $set: false },
      });
    case UNAUTHORIZED_ERROR:
      cookie.removeCookie("token");
      return update(state, {
        token: { $set: "" },
        error: { $set: true },
      });
    default:
      return state;
  }
}
