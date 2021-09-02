//Action types for settings reducer
export const SET_MAX_CACHE_SIZE = '@setMaxCacheSize';

export interface SetMaxCacheSize {
  type: typeof SET_MAX_CACHE_SIZE;
  payload: number;
}

export type SettingsDispatchTypes = SetMaxCacheSize;
