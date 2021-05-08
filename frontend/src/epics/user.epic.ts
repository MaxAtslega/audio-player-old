import AudioUpload from "@models/AudioUpload";
import getApiUrl from "@utils/getApiUrl";
import { push } from "connected-next-router";
import { Epic, combineEpics, ofType } from "redux-observable";
import { Observable, from, of } from "rxjs";
import { catchError, map, mapTo, switchMap } from "rxjs/operators";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  CREATE_AUDIO,
  DELETE_AUDIO,
  LOAD_AUDIOS,
  SELECT_AUDIO,
  UPDATE_AUDIO,
  audioUrlAction,
  createAudioSuccessAction,
  deleteAudioSuccessAction,
  errorAction,
  loadAudiosSuccessAction,
  updateAudioSuccessAction,
  CREATE_AUDIO_SUCCESS,
  UPDATE_AUDIO_SUCCESS,
  DELETE_AUDIO_SUCCESS,
  DOWNLOAD_AUDIO,
  downloadAudioEndAction,
} from "@actions/user.actions";
import { unauthorizedErrorAction } from "@actions/auth.actions";
import { ActionType } from "typesafe-actions";
import { getToken } from "@selectors/login.selectors";
import Audio from "../models/Audio";

function handleError(
  err: AxiosError
): Observable<ActionType<typeof unauthorizedErrorAction | typeof errorAction>> {
  if (err.response && err.response!.status === 401) {
    return of(unauthorizedErrorAction());
  }
  return of(errorAction(err.toString()));
}

function getConfig(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function getConfigWithBlob(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };
}

const loadAudios: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOAD_AUDIOS),
    switchMap(() =>
      from(
        axios.get<Audio[]>(
          `${getApiUrl()}/audio`,
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
    switchMap(({ payload: uuid }) =>
      from(
        axios.delete(
          `${getApiUrl()}/audio/${uuid}`,
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(() => deleteAudioSuccessAction(uuid)),
        catchError(handleError)
      )
    )
  );

function prepareForRequest(
  Audio: AudioUpload,
  token: string
): [FormData, AxiosRequestConfig] {
  const data = new FormData();
  data.append("name", Audio.name);
  data.append("category", Audio.category.toString());
  if (Audio.file) data.append("audio", Audio.file);

  const config = getConfig(token);
  config.headers["content-type"] = "multipart/form-data";
  return [data, config];
}

function prepareForRequestForUpdateAudio(
  Audio: AudioUpload,
  token: string
): [{ name: string; category: string }, AxiosRequestConfig] {
  const data = {
    name: Audio.name,
    category: Audio.category,
  };

  const config = getConfig(token);
  return [data, config];
}

const createAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_AUDIO),
    switchMap(({ payload: Audio }) => {
      const [data, config] = prepareForRequest(Audio, getToken(state$.value));
      return from(axios.post(`${getApiUrl()}/audio`, data, config)).pipe(
        map(({ data }) => createAudioSuccessAction(data.message)),
        catchError(handleError)
      );
    })
  );

const updateAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_AUDIO),
    switchMap(({ payload: Audio }) => {
      const [data, config] = prepareForRequestForUpdateAudio(
        Audio,
        getToken(state$.value)
      );
      return from(
        axios.put(`${getApiUrl()}/audio/${Audio.uuid}`, data, config)
      ).pipe(
        map(() => updateAudioSuccessAction(Audio)),
        catchError(handleError)
      );
    })
  );

const getAudioUrl: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_AUDIO),
    switchMap(({ payload: Audio }) => {
      if (Audio.name) {
        return from(
          axios.get(
            `${getApiUrl()}/audio/${Audio.uuid}/download`,
            getConfigWithBlob(getToken(state$.value))
          )
        ).pipe(
          map(({ data }) => {
            return audioUrlAction(window.URL.createObjectURL(data));
          }),
          catchError(handleError)
        );
      }
      return of(audioUrlAction(""));
    })
  );

const downloadAudio: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DOWNLOAD_AUDIO),
    switchMap(({ payload: audio }) => {
      if (audio.uuid) {
        return from(
          axios.get(
            `${getApiUrl()}/audio/${audio.uuid}/download`,
            getConfigWithBlob(getToken(state$.value))
          )
        ).pipe(
          map(({ data }) => {
            const url = window.URL.createObjectURL(data);
            if (typeof window !== "undefined") {
              const a = document.createElement("a");
              a.href = url;
              a.download = `${audio.name}.${
                audio.file.split(".")[audio.file.split(".").length - 1]
              }`;
              a.click();
            }
            return downloadAudioEndAction();
          }),
          catchError(handleError)
        );
      }
      return of(downloadAudioEndAction());
    })
  );

const redirectToStart: Epic = action$ => {
  return action$.pipe(
    ofType(CREATE_AUDIO_SUCCESS, UPDATE_AUDIO_SUCCESS, DELETE_AUDIO_SUCCESS),
    mapTo(push("/"))
  );
};

export default combineEpics(
  loadAudios,
  deleteAudio,
  createAudio,
  updateAudio,
  getAudioUrl,
  downloadAudio,
  redirectToStart
);
