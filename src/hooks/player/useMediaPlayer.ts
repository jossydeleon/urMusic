import { useEffect, useState } from 'react';
import actionsCreators from '../../redux/actions';
import { useDispatch } from 'react-redux';
import useYtdl from '../util/useYtdl';
import TrackPlayer, {
  TrackPlayerEvents,
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
  useWhenPlaybackStateChanges,
} from 'react-native-track-player';
import { SearchVideoResult, Song } from '../../model';

const EventTypes = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
];

const useMediaPlayer = (isMediaPlayerComponent = false) => {
  //Hook Youtube catcher link
  const { getHighestAudioLink } = useYtdl();

  //Redux
  const dispatch = useDispatch();
  const {
    addSongToLibrary,
    deleteSongFromLibrary,
    setCurrentSongPlaying,
    setIsPlayingAnySong,
    setVolumeState,
  } = actionsCreators.playerActions;

  //TrackPlayer Hooks
  const progress = useTrackPlayerProgress();
  const playbackState = usePlaybackState();

  //States
  const [currentTrack, setCurrentTrack] = useState<TrackPlayer.Track>();
  const [position, setPosition] = useState(0);
  const [error, setError] = useState(null);

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumePosition] = useState(0);

  const [playbackChange, setPlaybackChange] = useState(0);

  /**
   *
   **/
  useTrackPlayerEvents(EventTypes, async event => {
    switch (event.type) {
      case TrackPlayerEvents.PLAYBACK_TRACK_CHANGED:
        const track = await TrackPlayer.getTrack(event.nextTrack);
        setCurrentTrack(track || undefined);
        break;
    }
  });

  useEffect(() => {
    if (error) {
      console.log('Error somewhere at useMediaPlayer: ' + error);
    }
  }, [error]);

  useWhenPlaybackStateChanges(() => {
    setPlaybackChange(Date.now());
  });

  /**
   * Effect to run initial functions
   **/
  useEffect(() => {
    getVolume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect that get fire everytime state of playback change
   **/
  useEffect(() => {
    const result =
      playbackState === TrackPlayer.STATE_PLAYING ||
      playbackState === TrackPlayer.STATE_BUFFERING;
    setIsPlaying(result);
    dispatch(setIsPlayingAnySong(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackState]);

  /**
   * Effect that gets fire everytime currentTrack is changed
   * */
  useEffect(() => {
    getCurrentTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  /**
   * Effect to set current duration in seconds of a track
   * */
  useEffect(() => {
    if (!isMediaPlayerComponent) {
      return;
    }
    setDuration(progress.duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.duration]);

  /**
   * Effect to set current position in seconds of a track
   * */
  useEffect(() => {
    if (!isMediaPlayerComponent) {
      return;
    }
    setPosition(progress.position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.position]);

  /**
   * Return if track sent by id is playing.
   * */
  const isCurrentTrackPlaying = async (id: string): Promise<boolean> => {
    const current = await TrackPlayer.getCurrentTrack();
    return current === id && isPlaying;
  };
  /**
   * Get current track active in the queue
   * and dispatch it to the global store
   **/
  const getCurrentTrack = async (): Promise<TrackPlayer.Track | undefined> => {
    setError(null);
    try {
      const id = await TrackPlayer.getCurrentTrack();
      if (!id) {
        return undefined;
      }
      const current = await TrackPlayer.getTrack(id);
      const song = new Song(
        current.id,
        current.title,
        current.artist,
        current.artwork,
        current.duration || 0,
        current.url,
      );
      dispatch(setCurrentSongPlaying(song));
      return current;
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Get current volume
   **/
  const getVolume = async (): Promise<void> => {
    setError(null);
    try {
      const result = await TrackPlayer.getVolume();
      setVolumePosition(result);
      dispatch(setVolumeState(result));
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Play current track
   **/
  const play = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.play();
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Play track by Id
   * */
  const playTrackById = async (id: string): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.skip(id);
    } catch (err) {
      setError(err);
      console.error('PlayTrackById: ' + err);
    }
  };

  /**
   * Pause current track
   **/
  const pauseTrack = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.pause();
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Skip to next track
   **/
  const nextTrack = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.skipToNext();
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Skip to previous track
   **/
  const previousTrack = async () => {
    setError(null);
    try {
      await TrackPlayer.skipToPrevious();
    } catch (err) {
      setError(err);
    }
  };

  const seekTo = async (value: number) => {
    setError(null);
    try {
      await TrackPlayer.seekTo(value);
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Set volume
   * @param value
   **/
  const setVolume = async (value: number) => {
    setError(null);
    try {
      await TrackPlayer.setVolume(value);
      dispatch(setVolumeState(value));
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Add video from Youtube to queue.
   * 1. Attempt to get playable link
   * 2. Add video to track queue
   * */
  const addTrack = async (video: SearchVideoResult): Promise<void> => {
    setError(null);
    try {
      //Request playable url
      const playableLink = await getHighestAudioLink(video.url, {
        quality: 'highestaudio',
      });

      const song = new Song(
        video.id,
        video.title,
        video.artist,
        video.avatar,
        video.duration,
        playableLink,
      );

      await TrackPlayer.add(song);
      await TrackPlayer.play();

      dispatch(addSongToLibrary(song));
    } catch (err) {
      console.error('useMediaPlayer-addTrack => ' + err);
      setError(err);
    }
  };

  /**
   * Remove song from queue and dispatch
   * delete to redux store
   * */
  const removeTrack = async (song: Song): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.remove(song.id);
      dispatch(deleteSongFromLibrary(song));
    } catch (err) {
      console.error('useMediaPlayer-removeTrack => ' + err);
      setError(err);
    }
  };

  return {
    position,
    duration,
    isPlaying,
    currentTrack,
    volume,
    getCurrentTrack,
    nextTrack,
    previousTrack,
    play,
    playTrackById,
    pauseTrack,
    seekTo,
    setVolume,
    addTrack,
    removeTrack,
    isCurrentTrackPlaying,
    playbackChange,
  };
};

export default useMediaPlayer;
