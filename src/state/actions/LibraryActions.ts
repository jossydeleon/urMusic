import { Dispatch } from 'redux';
import {
  ADD_TO_LIBRARY,
  DELETE_FROM_LIBRARY,
  LibraryDispatchTypes,
} from './LibraryActionTypes';
import { ISong } from '../../types';

export const addSongToLibrary =
  (song: ISong) => (dispatch: Dispatch<LibraryDispatchTypes>) => {
    dispatch({
      type: ADD_TO_LIBRARY,
      payload: song,
    });
  };

export const deleteSongFromLibrary =
  (song: ISong | string | number) =>
  (dispatch: Dispatch<LibraryDispatchTypes>) => {
    let value: string | number;
    if (typeof song === 'number') {
      value = song;
    } else if (typeof song === 'string') {
      value = song;
    } else {
      value = song.id;
    }

    dispatch({
      type: DELETE_FROM_LIBRARY,
      payload: value,
    });
  };
