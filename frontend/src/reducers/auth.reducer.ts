import { ActionType } from "typesafe-actions";
import update from "immutability-helper";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  loginErrorAction,
  loginSuccessAction,
  LOGOUT,
  logoutAction,
  REAUTHENTICATE,
  reauthenticateAction,
} from "../actions/auth.actions";
import cookie from "js-cookie";

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
  >
): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      cookie.set("token", action.payload);
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
      cookie.remove("token");
      return update(state, {
        token: { $set: "" },
        error: { $set: false },
      });
    case REAUTHENTICATE:
      return update(state, {
        token: { $set: action.payload },
        error: { $set: false },
      });

    default:
      return state;
  }
}
