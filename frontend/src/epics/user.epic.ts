import { combineEpics, ofType, Epic } from "redux-observable";
import { from, of, Observable } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import {
  LOAD_AUDIOS,
  loadAudiosSuccessAction,
  errorAction,
  DELETE_AUDIO,
  deleteAudioSuccessAction,
  CREATE_AUDIO,
  UPDATE_AUDIO,
  updateAudioSuccessAction,
  createAudioSuccessAction,
} from "../actions/user.actions";
import Audio from "../models/Audio";
import { unauthorizedErrorAction } from "../actions/auth.actions";
import { ActionType } from "typesafe-actions";
import { getToken } from "../selectors/login.selectors";

function handleError(
  err: AxiosError
): Observable<ActionType<typeof unauthorizedErrorAction | typeof errorAction>> {
  if (err.response!.status === 401) {
    return of(unauthorizedErrorAction());
  }
  return of(errorAction(err.toString()));
}

const loadAudios: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOAD_AUDIOS),
    switchMap(() =>
      from(
        axios.get<Audio[]>(
          process.env.API_URL + "/audio",
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(({ data }) => loadAudiosSuccessAction(data)),
        catchError(handleError)
      )
    )
  );

const deleteAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DELETE_AUDIO),
    switchMap(({ payload: id }) =>
      from(
        axios.delete(
          process.env.API_URL + `/audio/${id}`,
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(() => deleteAudioSuccessAction(id)),
        catchError(handleError)
      )
    )
  );

function getConfig(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function prepareForRequest(
  Audio: Audio,
  token: string
): [FormData, AxiosRequestConfig] {
  const data = new FormData();
  data.append("name", Audio.name);
  data.append("url", Audio.url);
  data.append("category", Audio.category.toString());

  const config = getConfig(token);
  config.headers["content-type"] = "multipart/form-data";
  return [data, config];
}

const createAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_AUDIO),
    switchMap(({ payload: Audio }) => {
      const [data, config] = prepareForRequest(Audio, getToken(state$.value));
      return from(
        axios.post(process.env.API_URL + "/audio", data, config)
      ).pipe(
        map(({ data }) => createAudioSuccessAction(data)),
        catchError(handleError)
      );
    })
  );

const updateAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_AUDIO),
    switchMap(({ payload: Audio }) => {
      const [data, config] = prepareForRequest(Audio, getToken(state$.value));
      return from(
        axios.put(process.env.API_URL + `/audio/${Audio.id}`, data, config)
      ).pipe(
        map(({ data }) => updateAudioSuccessAction(data)),
        catchError(handleError)
      );
    })
  );

export default combineEpics(loadAudios, deleteAudio, createAudio, updateAudio);
