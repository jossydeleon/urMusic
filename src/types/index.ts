import { Track } from 'react-native-track-player';
import { Video } from '../hooks/util/react-usetube/types';

export interface IVideo {
  videoId: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
  url: string;
}

export interface ISong {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration?: number;
  url: string;
}

export interface IPlayerState {
  isPlaying: boolean;
  volume: number;
  currentSongPlaying: ISong | null | undefined;
  currentSongYoutubeUrl: string;
  library: ISong[];
}

export interface IAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

export function createAction<T extends string, P>(
  type: T,
  payload: P,
): IAction<T, P> {
  return { type, payload };
}

export const isTrackType = (t: Track | Video | ISong): t is Track => {
  return (t as Track).pitchAlgorithm !== undefined;
};

export function isVideoType(
  video: ISong | Video | ISong[] | Video[],
): video is Video {
  if (Array.isArray(video) && video.length > 0) {
    return (video[0] as Video).original_title !== undefined;
  } else {
    return (video as Video).original_title !== undefined;
  }
}
