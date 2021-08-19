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
