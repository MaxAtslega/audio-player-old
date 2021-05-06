import { AppState } from "../reducers/rootReducer";
import Audio from "@models/Audio";

export function getAudios(state: AppState): Audio[] {
  return state.user.audios;
}

export function getError(state: AppState): string {
  return state.user.error;
}

export function getSelectedAudioUrl(state: AppState): string {
  return state.user.selectedAudioUrl;
}

export function getSelectedAudio(state: AppState): Audio {
  return state.user.selectedAudio;
}

export function getAudio(state: AppState): (uuid?: string) => Audio {
  return (uuid?: string): Audio => {
    const audio = getAudios(state).find(audio => audio.uuid === uuid);
    if (!audio) {
      return new Audio("", "","","","", "");
    }
    return audio;
  };
}
