import axios from "axios";
import { combineEpics, ofType, Epic } from "redux-observable";
import {
  LOGIN,
  loginSuccessAction,
  loginErrorAction,
  logoutAction,
  LOGIN_SUCCESS,
  UNAUTHORIZED_ERROR,
  LOGOUT,
  REAUTHENTICATE,
  reauthenticateAction,
} from "../actions/auth.actions";
import { switchMap, catchError, map, mapTo } from "rxjs/operators";
import { from, of } from "rxjs";
import { push } from "connected-next-router";

const login: Epic = action$ =>
  action$.pipe(
    ofType(LOGIN),
    switchMap(({ payload }) =>
      from(
        axios.post<{ access_token: string }>(
          process.env.API_URL + "/auth/login",
          payload
        )
      ).pipe(
        map(({ data: access_token }) =>
          loginSuccessAction(access_token.access_token)
        ),
        catchError(() => of(loginErrorAction()))
      )
    )
  );

const redirectToStart: Epic = action$ => {
  return action$.pipe(ofType(LOGIN_SUCCESS), mapTo(push("/")));
};

const redirectToLogin: Epic = action$ => {
  return action$.pipe(
    ofType(LOGOUT, UNAUTHORIZED_ERROR),
    mapTo(push("/login"))
  );
};

export default combineEpics(login, redirectToStart, redirectToLogin);
