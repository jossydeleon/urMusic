import { ISong } from '../../types';

//Action types for library reducer
export const LOADING_LIBRARY = '@loadingLibrary';
export const LOAD_MUSIC_LIBRARY = '@loadMusicLibrary';
export const ADD_TO_LIBRARY = '@addSong';
export const DELETE_FROM_LIBRARY = '@deleteSong';
export const GET_LIBRARY = '@getLibrary';

export interface LoadingLibrary {
  type: typeof LOADING_LIBRARY;
}

export interface LoadMusicLibrary {
  type: typeof LOAD_MUSIC_LIBRARY;
  payload: ISong[];
}

export interface AddSongToLibrary {
  type: typeof ADD_TO_LIBRARY;
  payload: ISong;
}

export interface DeleteSongFromLibrary {
  type: typeof DELETE_FROM_LIBRARY;
  payload: ISong | string | number;
}

export interface GetLibrary {
  type: typeof GET_LIBRARY;
}

export type LibraryDispatchTypes =
  | LoadingLibrary
  | LoadMusicLibrary
  | AddSongToLibrary
  | DeleteSongFromLibrary
  | GetLibrary;
