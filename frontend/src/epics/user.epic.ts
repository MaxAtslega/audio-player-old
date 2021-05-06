import { combineEpics, ofType, Epic } from "redux-observable";
import { from, of, Observable, EMPTY } from "rxjs";
import { map, catchError, switchMap, mapTo } from "rxjs/operators";
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
  createAudioSuccessAction, AUDIO_URL, SELECT_AUDIO, audioUrlAction,
} from "@actions/user.actions";
import Audio from "../models/Audio";
import { unauthorizedErrorAction } from "@actions/auth.actions";
import { ActionType } from "typesafe-actions";
import { getToken } from "@selectors/login.selectors";

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
    switchMap(({ payload: uuid }) =>
      from(
        axios.delete(
          process.env.API_URL + `/audio/${uuid}`,
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(() => deleteAudioSuccessAction(uuid)),
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

function getConfigWithBlob(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  };
}

function prepareForRequest(
  Audio: Audio,
  token: string
): [FormData, AxiosRequestConfig] {
  const data = new FormData();
  data.append("name", Audio.name);
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


const getAudioUrl: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_AUDIO),
    switchMap(({payload: Audio}) => {
      if(Audio.name){
        return from(
          axios.get(
            process.env.API_URL+"/audio/"+Audio.uuid+"/download",
            getConfigWithBlob(getToken(state$.value))
          )
        ).pipe(
          map(({ data }) => {
            return audioUrlAction(window.URL.createObjectURL(data));
          }),
          catchError(handleError)
        )
      }else{
        return of(audioUrlAction(""));
      }
    }

    )
  );
export default combineEpics(loadAudios, deleteAudio, createAudio, updateAudio, getAudioUrl);
