import { Dispatch } from 'redux';
import {
  SettingsDispatchTypes,
  SET_MAX_CACHE_SIZE,
} from './SettingsActionTypes';
import TrackPlayer from 'react-native-track-player';

export const setMaxCacheSize =
  (value: number) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    //Set MaxSize in TrackPlayer
    await TrackPlayer.setupPlayer({
      maxCacheSize: value,
    });

    dispatch({
      type: SET_MAX_CACHE_SIZE,
      payload: value,
    });
  };
