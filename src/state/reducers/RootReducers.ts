import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import libraryReducer from './LibraryReducer';

const RootReducers = combineReducers({
  player: playerReducer,
  library: libraryReducer,
});

export default RootReducers;
