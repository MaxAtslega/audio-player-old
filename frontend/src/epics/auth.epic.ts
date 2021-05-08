import getApiUrl from "@utils/getApiUrl";
import axios from "axios";
import { Epic, combineEpics, ofType } from "redux-observable";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  loginErrorAction,
  loginSuccessAction,
} from "@actions/auth.actions";
import { catchError, map, mapTo, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { push } from "connected-next-router";

const login: Epic = action$ =>
  action$.pipe(
    ofType(LOGIN),
    switchMap(({ payload }) =>
      from(
        axios.post<{ access_token: string }>(
          `${getApiUrl()}/auth/login`,
          payload
        )
      ).pipe(
        map(({ data }) => loginSuccessAction(data.access_token)),
        catchError(() => of(loginErrorAction()))
      )
    )
  );

const redirectToStart: Epic = action$ => {
  return action$.pipe(ofType(LOGIN_SUCCESS), mapTo(push("/")));
};

const redirectToLogin: Epic = action$ => {
  return action$.pipe(ofType(LOGOUT), mapTo(push("/login")));
};

export default combineEpics(login, redirectToStart, redirectToLogin);
