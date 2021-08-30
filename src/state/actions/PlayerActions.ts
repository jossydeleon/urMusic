import { ISong } from '../../types';
import {
  SET_CURRENT_SONG_PLAYING,
  SET_CURRENT_IS_PLAYING,
  SET_REPEAT_MODE,
} from './PlayerActionTypes';

export const setIsPlaying = (value: boolean) => {
  return {
    type: SET_CURRENT_IS_PLAYING,
    payload: value,
  };
};

export const setCurrentSongPlaying = (song: ISong) => {
  return {
    type: SET_CURRENT_SONG_PLAYING,
    payload: song,
  };
};

export const setRepeatMode = (mode: 'queue' | 'off') => {
  return {
    type: SET_REPEAT_MODE,
    payload: mode,
  };
};
