import update from "immutability-helper";
import Audio from "@models/Audio";
import { ActionType } from "typesafe-actions";
import {
  deleteAudioSuccessAction,
  createAudioSuccessAction,
  updateAudioSuccessAction,
  DELETE_AUDIO_SUCCESS,
  CREATE_AUDIO_SUCCESS,
  UPDATE_AUDIO_SUCCESS,
  LOAD_AUDIOS_SUCCESS,
  loadAudiosSuccessAction,
  ERROR,
  errorAction,
} from "../actions/user.actions";

export interface State {
  audios: Audio[];
  error: string;
}

export default function userReducer(
  state: State = { audios: [], error: "" },
  action: ActionType<
    | typeof deleteAudioSuccessAction
    | typeof createAudioSuccessAction
    | typeof updateAudioSuccessAction
    | typeof loadAudiosSuccessAction
    | typeof errorAction
  >
): State {
  switch (action.type) {
    case DELETE_AUDIO_SUCCESS:
      const filteredAudios = state.audios.filter(
        audio => audio.uuid !== action.payload.toString()
      );

      return update(state, { audios: { $set: filteredAudios } });
    case CREATE_AUDIO_SUCCESS:
      const newAudio = update(action.payload, {
        uuid: { $set: action.payload.uuid },
      });
      return update(state, { audios: { $push: [newAudio] } });
    case UPDATE_AUDIO_SUCCESS:
      const AudioIndex = state.audios.findIndex(
        Audio => Audio.uuid === action.payload.uuid
      );
      return update(state, {
        audios: { [AudioIndex]: { $set: action.payload } },
      });
    case LOAD_AUDIOS_SUCCESS:
      return update(state, { audios: { $set: action.payload } });
    case ERROR:
      return update(state, {
        error: { $set: action.payload },
      });
    default:
      return state;
  }
}
