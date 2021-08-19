import playerReducer from './playerReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  player: playerReducer,
});

export default allReducers;
