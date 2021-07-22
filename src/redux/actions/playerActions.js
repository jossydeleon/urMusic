import TrackPlayer, { TrackPlayerEvents } from 'react-native-track-player';
import * as actions from './types';

const YOUTUBE_URL = 'https://youtube.com/watch?v=';

/**
 *
 * @param {*} state
 * @returns
 */
export const setIsPlayingAnySong = state => {
  return {
    type: actions.SET_IS_PLAYING,
    payload: state,
  };
};


/**
 *
 * @param {*} state
 * @returns
 */
 export const setVolumeState = state => {
  return {
    type: actions.SET_VOLUME,
    payload: state,
  };
};

/**
 *
 * @param {*} dispatch
 * @param {*} getState
 * @returns
 */
export const addSongToLibrary = track => async (dispatch, getState) => {
  const {library} = getState().player;
  const found = library.some(song => song.id === track.id);

  if (!found) {
    return dispatch({
      type: actions.ADD_TO_LIBRARY,
      payload: track,
    });
  }

  alert('Found was already added!');
};


/**
 *
 * @param {*} dispatch
 * @param {*} getState
 * @returns
 */
export const deleteSongFromLibrary = track => {
  return {
    type: actions.DELETE_FROM_LIBRARY,
    payload: track,
  };
};

/**
 *
 **/
export const setCurrentSongPlaying = song => async (dispatch, getState) => {
  //Set current song to play
  return dispatch({
    type: actions.SET_CURRENT_SONG_PLAYING,
    payload: {
      currentSongPlaying: song,
      currentSongYoutubeUrl: YOUTUBE_URL + song.id,
    },
  });
};
