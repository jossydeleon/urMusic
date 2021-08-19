import { Dispatch } from 'redux';
import { createAction, ISong } from '../../types';
import * as actions from './types';

const YOUTUBE_URL = 'https://youtube.com/watch?v=';

/**
 *
 * @param {*} state
 * @returns
 */
export const setIsPlayingAnySong = (state: boolean) => {
  return createAction(actions.SET_IS_PLAYING, state);
};

/**
 *
 * @param {*} state
 * @returns
 */
export const setVolumeState = (state: number) => {
  return createAction(actions.SET_VOLUME, state);
};

/**
 *
 * @param {*} dispatch
 * @param {*} getState
 * @returns
 */
export const addSongToLibrary =
  (track: ISong) => async (dispatch: Dispatch, getState: any) => {
    const { library } = getState();
    const found = library.some((song: ISong) => song.id === track.id);

    if (!found) {
      return dispatch(createAction(actions.ADD_TO_LIBRARY, track));
    }
  };

/**
 *
 * @param {*} dispatch
 * @param {*} getState
 * @returns
 */
export const deleteSongFromLibrary = (track: ISong) => {
  return createAction(actions.DELETE_FROM_LIBRARY, track);
};

/**
 *
 **/
export const setCurrentSongPlaying = (song: ISong) => {
  //Set current song to play
  return createAction(actions.SET_CURRENT_SONG_PLAYING, {
    currentSongPlaying: song,
    currentSongYoutubeUrl: YOUTUBE_URL + song.id,
  });
};
