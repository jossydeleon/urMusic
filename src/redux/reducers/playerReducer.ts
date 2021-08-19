import { IAction, IPlayerState } from '../../types';
import * as actionsTypes from '../actions/types';

const initialState: IPlayerState = {
  isPlaying: false,
  volume: 0,
  currentSongPlaying: null,
  currentSongYoutubeUrl: '',
  library: [],
};

type PlayerActions = IAction<
  | typeof actionsTypes.SET_VOLUME
  | typeof actionsTypes.SET_IS_PLAYING
  | typeof actionsTypes.SET_CURRENT_SONG_PLAYING
  | typeof actionsTypes.ADD_TO_LIBRARY
  | typeof actionsTypes.DELETE_FROM_LIBRARY,
  any
>;

const playerReducer = (state = initialState, action: PlayerActions) => {
  switch (action.type) {
    case actionsTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case actionsTypes.SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload };
    case actionsTypes.SET_CURRENT_SONG_PLAYING:
      return { ...state, currentSongPlaying: action.payload };
    case actionsTypes.ADD_TO_LIBRARY:
      return {
        ...state,
        library: [...state.library, action.payload],
      };
    case actionsTypes.DELETE_FROM_LIBRARY:
      return {
        ...state,
        library: [...state.library.filter(item => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default playerReducer;
