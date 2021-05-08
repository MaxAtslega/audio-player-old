import update from "immutability-helper";
import Audio from "@models/Audio";
import { ActionType } from "typesafe-actions";
import {
  AUDIO_URL,
  CREATE_AUDIO_SUCCESS,
  DELETE_AUDIO_SUCCESS,
  ERROR,
  LOAD_AUDIOS_SUCCESS,
  SELECT_AUDIO,
  UPDATE_AUDIO_SUCCESS,
  audioUrlAction,
  createAudioSuccessAction,
  deleteAudioSuccessAction,
  errorAction,
  loadAudiosSuccessAction,
  selectAudioAction,
  updateAudioSuccessAction,
} from "@actions/user.actions";

export interface State {
  audios: Audio[];
  error: string;
  selectedAudio: any;
  selectedAudioUrl: string;
}

export default function userReducer(
  state: State = {
    audios: [],
    error: "",
    selectedAudio: JSON.parse(
      JSON.stringify(new Audio("", "", "", "", "", ""))
    ),
    selectedAudioUrl: "",
  },
  action: ActionType<
    | typeof deleteAudioSuccessAction
    | typeof createAudioSuccessAction
    | typeof updateAudioSuccessAction
    | typeof loadAudiosSuccessAction
    | typeof selectAudioAction
    | typeof audioUrlAction
    | typeof errorAction
  >
): State {
  switch (action.type) {
    case AUDIO_URL: {
      return update(state, {
        selectedAudioUrl: { $set: action.payload },
      });
    }
    case DELETE_AUDIO_SUCCESS: {
      const filteredAudios = state.audios.filter(
        audio => audio.uuid !== action.payload.toString()
      );

      return update(state, { audios: { $set: filteredAudios } });
    }
    case CREATE_AUDIO_SUCCESS: {
      const newAudio = update(action.payload, {
        uuid: { $set: action.payload.uuid },
      });
      return update(state, { audios: { $push: [newAudio] } });
    }
    case UPDATE_AUDIO_SUCCESS: {
      const AudioIndex = state.audios.findIndex(
        Audio => Audio.uuid === action.payload.uuid
      );
      return update(state, {
        audios: { [AudioIndex]: { $set: action.payload } },
      });
    }
    case LOAD_AUDIOS_SUCCESS: {
      return update(state, { audios: { $set: action.payload } });
    }
    case ERROR: {
      return update(state, {
        error: { $set: action.payload },
      });
    }
    case SELECT_AUDIO: {
      return update(state, {
        selectedAudio: { $set: action.payload },
      });
    }
    default:
      return state;
  }
}
