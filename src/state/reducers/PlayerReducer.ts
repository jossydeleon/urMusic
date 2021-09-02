import { ISong } from '../../types';
import {
  PlayerDispatchTypes,
  SET_CURRENT_IS_PLAYING,
  SET_CURRENT_SONG_PLAYING,
  SET_PLAYER_VOLUME,
  SET_REPEAT_MODE,
} from '../actions/PlayerActionTypes';

export interface IDefaultPlayerState {
  isPlaying: boolean;
  currentSongPlaying?: ISong;
  repeatMode: 'queue' | 'off';
  volume: number;
}

const defaultState: IDefaultPlayerState = {
  isPlaying: false,
  repeatMode: 'off',
  volume: 0.5,
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
    case SET_REPEAT_MODE:
      return {
        ...state,
        repeatMode: action.payload,
      };
    case SET_PLAYER_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
