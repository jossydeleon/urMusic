import { Dispatch } from 'redux';
import { ISong } from '../../types';
import {
  SET_CURRENT_SONG_PLAYING,
  SET_CURRENT_IS_PLAYING,
  SET_REPEAT_MODE,
  SET_PLAYER_VOLUME,
  PlayerDispatchTypes,
} from './PlayerActionTypes';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

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

export const setVolume =
  (level: number) => async (dispatch: Dispatch<PlayerDispatchTypes>) => {
    //Set volume in TrackPlayer
    await TrackPlayer.setVolume(level);

    dispatch({
      type: SET_PLAYER_VOLUME,
      payload: level,
    });
  };

export const setRepeatMode =
  (mode: 'queue' | 'off') =>
  async (dispatch: Dispatch<PlayerDispatchTypes>) => {
    //Set repeat mode in TrackPlayer
    await TrackPlayer.setRepeatMode(
      mode === 'off' ? RepeatMode.Off : RepeatMode.Queue,
    );

    dispatch({
      type: SET_REPEAT_MODE,
      payload: mode,
    });
  };
