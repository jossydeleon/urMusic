import * as actions from '../actions/types';

const initialState = {
  isPlaying: false,
  volume: 0,
  currentSongPlaying: null,
  currentSongYoutubeUrl: '',
  library: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_VOLUME:
      return {...state, volume: action.payload};
    case actions.SET_IS_PLAYING:
      return {...state, isPlaying: action.payload};
    case actions.SET_CURRENT_SONG_PLAYING:
      return {...state, ...action.payload};
    case actions.ADD_TO_LIBRARY:
      return {
        ...state, 
        library: [...state.library, action.payload]
      };
    case actions.DELETE_FROM_LIBRARY:
      return {
        ...state,
        library: [...state.library.filter(item => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default playerReducer;
