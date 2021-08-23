import { ISong } from '../../types';

//Action types for player reducer
export const SET_CURRENT_SONG_PLAYING = '@setSongPlaying';
export const SET_CURRENT_IS_PLAYING = '@setIsPlaying';

export interface SetCurrentSongPlaying {
  type: typeof SET_CURRENT_SONG_PLAYING;
  payload: ISong;
}

export interface SetIsPlaying {
  type: typeof SET_CURRENT_IS_PLAYING;
  payload: boolean;
}

export type PlayerDispatchTypes = SetCurrentSongPlaying | SetIsPlaying;
