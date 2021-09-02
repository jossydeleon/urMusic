import { Dispatch } from 'redux';
import {
  LOAD_MUSIC_LIBRARY,
  ADD_TO_LIBRARY,
  DELETE_FROM_LIBRARY,
  LibraryDispatchTypes,
} from './LibraryActionTypes';
import { ISong } from '../../types';
import TrackPlayer from 'react-native-track-player';

export const loadLibrary =
  (playlist: ISong[]) => async (dispatch: Dispatch<LibraryDispatchTypes>) => {
    //Load playlist to TrackPlayer
    await TrackPlayer.add(playlist);

    dispatch({
      type: LOAD_MUSIC_LIBRARY,
      payload: playlist,
    });
  };

export const addSongToLibrary =
  (song: ISong) => async (dispatch: Dispatch<LibraryDispatchTypes>) => {
    //Add song to TrackPlayer
    await TrackPlayer.add(song);

    dispatch({
      type: ADD_TO_LIBRARY,
      payload: song,
    });
  };

export const deleteSongFromLibrary =
  (song: ISong | string | number) =>
  async (dispatch: Dispatch<LibraryDispatchTypes>) => {
    let value: string | number;
    if (typeof song === 'number') {
      value = song;
    } else if (typeof song === 'string') {
      value = song;
    } else {
      value = song.id;
    }

    //Remove song from TrackPlayer
    //await TrackPlayer.remove();

    dispatch({
      type: DELETE_FROM_LIBRARY,
      payload: value,
    });
  };
