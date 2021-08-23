import { ISong } from '../../types';
import {
  PlayerDispatchTypes,
  SET_CURRENT_IS_PLAYING,
  SET_CURRENT_SONG_PLAYING,
} from '../actions/PlayerActionTypes';

export interface IDefaultPlayerState {
  isPlaying: boolean;
  currentSongPlaying?: ISong;
}

const defaultState: IDefaultPlayerState = {
  isPlaying: false,
};

const playerReducer = (
  state = defaultState,
  action: PlayerDispatchTypes,
): IDefaultPlayerState => {
  switch (action.type) {
    case SET_CURRENT_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SET_CURRENT_SONG_PLAYING:
      return {
        ...state,
        currentSongPlaying: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
