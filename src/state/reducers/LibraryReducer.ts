import { ISong } from '../../types';
import {
  ADD_TO_LIBRARY,
  DELETE_FROM_LIBRARY,
  LibraryDispatchTypes,
  LOAD_MUSIC_LIBRARY,
} from '../actions/LibraryActionTypes';

export interface IDefaultLibraryState {
  playlist: ISong[];
}

const defaultState: IDefaultLibraryState = {
  playlist: [],
};

const libraryReducer = (state = defaultState, action: LibraryDispatchTypes) => {
  switch (action.type) {
    case LOAD_MUSIC_LIBRARY:
      return {
        ...state,
        playlist: [...action.payload],
      };

    case ADD_TO_LIBRARY:
      return {
        ...state,
        playlist: [action.payload, ...state.playlist],
      };

    case DELETE_FROM_LIBRARY:
      return {
        ...state,
        playlist: state.playlist.filter(song => song.id !== action.payload),
      };

    default:
      return state;
  }
};

export default libraryReducer;
