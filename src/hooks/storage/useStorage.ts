import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISong } from '../../types';

export const AsyncTypes = {
  Playlist: '@playlist',
  RepeatMode: '@repeatMode',
};

/**
 * Add song to playlist storage
 * @param song new song
 */
export const addSongToPlaylistStorage = async (song: ISong) => {
  try {
    const response = await AsyncStorage.getItem(AsyncTypes.Playlist);
    const playlist = parse(response) as ISong[];
    if (playlist === null) {
      await AsyncStorage.setItem(
        AsyncTypes.Playlist,
        stringlify([{ ...song }]),
      );
    } else if (Array.isArray(playlist)) {
      playlist.push(song);
      await AsyncStorage.setItem(AsyncTypes.Playlist, stringlify(playlist));
    }
  } catch (err) {
    console.error('addSongToPlaylistStorage', err);
  }
};

/**
 * Remove song from playlist storage
 * @param song song to delete could be song object or id string
 */
export const removeSongFromPlaylistStorage = async (
  song: ISong | string | number,
) => {
  try {
    let id: string;

    const playlist = await getPlaylistStorage();
    if (playlist == null) {
      return;
    }

    if (typeof song === 'string') {
      id = song;
    } else if (typeof song === 'number') {
      id = playlist[song].id;
    } else {
      id = song.id;
    }

    const removed = playlist.filter(item => item.id === id);

    await setPlaylistStorage(removed);
  } catch (err) {
    console.error('removeSongFromPlaylistStorage', err);
  }
};

/**
 * Set new playlist in storage
 * @param playlist new playlist
 */
export const setPlaylistStorage = async (playlist: ISong[]) => {
  try {
    const result = parse(playlist);
    await AsyncStorage.setItem(AsyncTypes.Playlist, result);
  } catch (err) {
    console.error('setPlaylistStorage', err);
  }
};

/**
 *  Get playlist
 * @returns playlist from storage
 */
export const getPlaylistStorage = async () => {
  try {
    const response = await AsyncStorage.getItem(AsyncTypes.Playlist);
    const playlist = parse(response) as ISong[];
    if (playlist != null && Array.isArray(playlist)) {
      return playlist;
    }

    return [];
  } catch (err) {
    console.error('getPlaylistStorage', err);
  }
};

/**
 * Remove playlisto from storage
 */
export const cleanPlaylistStorage = async () => {
  try {
    await AsyncStorage.removeItem(AsyncTypes.Playlist);
  } catch (err) {
    console.error('cleanPlaylistStorage', err);
  }
};

/**
 * Set repeat mode from storage
 * @param mode off or queue
 */
export const setRepeatModeStorage = async (mode: 'off' | 'queue') => {
  try {
    const result = stringlify(mode);
    await AsyncStorage.setItem(AsyncTypes.RepeatMode, result);
  } catch (err) {
    console.error('setRepeatModeStorage', err);
  }
};

/**
 * Get repeat mode from storage
 * @returns repeat mode
 */
export const getRepeatModeStorage = async () => {
  try {
    const response = await AsyncStorage.getItem(AsyncTypes.RepeatMode);
    const mode = parse(response) as 'off' | 'queue';
    if (mode != null) {
      return mode;
    }

    return 'off';
  } catch (err) {
    console.error('setRepeatModeStorage', err);
  }
};

const stringlify = (data: any) => {
  return JSON.stringify(data);
};

const parse = (data: any) => {
  return JSON.parse(data);
};
