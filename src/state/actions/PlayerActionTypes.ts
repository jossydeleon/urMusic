import { ISong } from '../../types';

//Action types for player reducer
export const SET_CURRENT_SONG_PLAYING = '@setSongPlaying';
export const SET_CURRENT_IS_PLAYING = '@setIsPlaying';
export const SET_REPEAT_MODE = '@setRepeatMode';
export const SET_PLAYER_VOLUME = '@setPlayerolume';

export interface SetCurrentSongPlaying {
  type: typeof SET_CURRENT_SONG_PLAYING;
  payload: ISong;
}

export interface SetIsPlaying {
  type: typeof SET_CURRENT_IS_PLAYING;
  payload: boolean;
}

export interface SetRepeatMode {
  type: typeof SET_REPEAT_MODE;
  payload: 'queue' | 'off';
}

export interface SetPlayerVolume {
  type: typeof SET_PLAYER_VOLUME;
  payload: number;
}

export type PlayerDispatchTypes =
  | SetCurrentSongPlaying
  | SetIsPlaying
  | SetPlayerVolume
  | SetRepeatMode;
