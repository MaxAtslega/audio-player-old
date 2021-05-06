import { createStandardAction, ActionType } from "typesafe-actions";
import Audio from "@models/Audio";

export const LOAD_AUDIOS = "LOAD_AUDIOS";
export type LOAD_AUDIOS = typeof LOAD_AUDIOS;

export const LOAD_AUDIOS_SUCCESS = "LOAD_AUDIOS_SUCCESS";
export type LOAD_AUDIOS_SUCCESS = typeof LOAD_AUDIOS_SUCCESS;

export const ERROR = "ERROR";
export type ERROR = typeof ERROR;

export const AUDIO_URL = "AUDIO_URL";
export type AUDIO_URL = typeof AUDIO_URL;

export const DELETE_AUDIO = "DELETE_AUDIO";
export type DELETE_AUDIO = typeof DELETE_AUDIO;

export const DELETE_AUDIO_SUCCESS = "DELETE_AUDIO_SUCCESS";
export type DELETE_AUDIO_SUCCESS = typeof DELETE_AUDIO_SUCCESS;

export const CREATE_AUDIO = "CREATE_AUDIO";
export type CREATE_AUDIO = typeof CREATE_AUDIO;

export const CREATE_AUDIO_SUCCESS = "CREATE_AUDIO_SUCCESS";
export type CREATE_AUDIO_SUCCESS = typeof CREATE_AUDIO_SUCCESS;

export const UPDATE_AUDIO = "UPDATE_AUDIO";
export type UPDATE_AUDIO = typeof UPDATE_AUDIO;

export const UPDATE_AUDIO_SUCCESS = "UPDATE_AUDIO_SUCCESS";
export type UPDATE_AUDIO_SUCCESS = typeof UPDATE_AUDIO_SUCCESS;

export const SELECT_AUDIO = "SELECT_AUDIO";
export type SELECT_AUDIO = typeof SELECT_AUDIO;

export const loadAudiosAction = createStandardAction(LOAD_AUDIOS)<void>();
export const loadAudiosSuccessAction = createStandardAction(
  LOAD_AUDIOS_SUCCESS
)<Audio[]>();


export const errorAction = createStandardAction(ERROR)<string>();

export const audioUrlAction = createStandardAction(AUDIO_URL)<string>();

export const selectAudioAction = createStandardAction(SELECT_AUDIO)<Audio>();

export const deleteAudioAction = createStandardAction(DELETE_AUDIO)<number>();
export const deleteAudioSuccessAction = createStandardAction(
  DELETE_AUDIO_SUCCESS
)<number>();

export const createAudioAction = createStandardAction(CREATE_AUDIO)<Audio>();
export const createAudioSuccessAction = createStandardAction(
  CREATE_AUDIO_SUCCESS
)<Audio>();

export const updateAudioAction = createStandardAction(UPDATE_AUDIO)<Audio>();
export const updateAudioSuccessAction = createStandardAction(
  UPDATE_AUDIO_SUCCESS
)<Audio>();

export type UserActions = ActionType<
  | typeof loadAudiosAction
  | typeof loadAudiosSuccessAction
  | typeof deleteAudioAction
  | typeof deleteAudioSuccessAction
  | typeof createAudioAction
  | typeof createAudioSuccessAction
  | typeof updateAudioAction
  | typeof updateAudioSuccessAction
  | typeof audioUrlAction
  | typeof errorAction
>;
