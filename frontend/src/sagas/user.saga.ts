import { ActionType } from "typesafe-actions";
import {
  LOAD_AUDIOS,
  loadAudiosSuccessAction,
  errorAction,
  deleteAudioSuccessAction,
  DELETE_AUDIO,
  deleteAudioAction,
  createAudioAction,
  updateAudioAction,
  CREATE_AUDIO,
  UPDATE_AUDIO,
  updateAudioSuccessAction,
  createAudioSuccessAction,
} from "../actions/user.actions";
import { takeLatest, put } from "@redux-saga/core/effects";
import axios from "axios";
import Audio from "../models/Audio";

function* loadAudios() {
  try {
    const { data } = yield axios.get<Audio[]>(process.env.API_URL + "/audio");
    yield put(loadAudiosSuccessAction(data));
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

function* deleteAudio({ payload: id }: ActionType<typeof deleteAudioAction>) {
  try {
    yield axios.delete(process.env.API_URL + `/audio/${id}`);
    yield put(deleteAudioSuccessAction(id));
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

function* saveAudio({
  payload: audio,
}: ActionType<typeof createAudioAction | typeof updateAudioAction>) {
  const data = new FormData();
  data.append("name", audio.name);
  data.append("url", audio.url);
  data.append("category", audio.category.toString());

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    if (audio.id) {
      const { data: updatedAudio } = yield axios.put<Audio>(
        process.env.API_URL + `/audio/${audio.id}`,
        data,
        config
      );
      yield put(updateAudioSuccessAction(updatedAudio));
    } else {
      const { data: newAudio } = yield axios.post<Audio>(
        process.env.API_URL + "/audio",
        data,
        config
      );
      yield put(createAudioSuccessAction(newAudio));
    }
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

export default function* adminSaga() {
  yield takeLatest(LOAD_AUDIOS, loadAudios);
  yield takeLatest(DELETE_AUDIO, deleteAudio);
  yield takeLatest(CREATE_AUDIO, saveAudio);
  yield takeLatest(UPDATE_AUDIO, saveAudio);
}
