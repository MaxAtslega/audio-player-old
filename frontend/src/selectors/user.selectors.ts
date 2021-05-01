import { AppState } from "../reducers/rootReducer";
import Audio from "@models/Audio";

export function getAudios(state: AppState): Audio[] {
  return state.user.audios;
}

export function getError(state: AppState): string {
  return state.user.error;
}

export function getAudio(state: AppState): (id?: string) => Audio {
  return (id?: string): Audio => {
    const audio = getAudios(state).find(audio => audio.uuid === id);
    if (!audio) {
      return new Audio("", "","0","","");
    }
    return audio;
  };
}
