import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import libraryReducer from './LibraryReducer';
import settingsReducer from './SettingsReducer';

const RootReducers = combineReducers({
  settings: settingsReducer,
  player: playerReducer,
  library: libraryReducer,
});

export default RootReducers;
