import {
  SettingsDispatchTypes,
  SET_MAX_CACHE_SIZE,
} from '../actions/SettingsActionTypes';

export interface IDefaultSettingsState {
  maxCacheSize: number;
}

const defaultState: IDefaultSettingsState = {
  maxCacheSize: 1000000, //1GB
};

const settingsReducer = (
  state = defaultState,
  action: SettingsDispatchTypes,
): IDefaultSettingsState => {
  switch (action.type) {
    case SET_MAX_CACHE_SIZE:
      return {
        ...state,
        maxCacheSize: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
