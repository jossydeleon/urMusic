import { useEffect, useState } from 'react';
import actionsCreators from '../../redux/actions';
import { useDispatch } from 'react-redux';
import useYtdl from '../util/useYtdl';
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { Song } from '../../model';
import { Video } from '../util/react-usetube/types';

const EventTypes = [
  Event.PlaybackState,
  Event.PlaybackTrackChanged,
  Event.RemotePlay,
  Event.RemotePause,
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
  const progress = useProgress();
  const playbackState = usePlaybackState();

  //States
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [position, setPosition] = useState(0);
  const [error, setError] = useState(null);

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumePosition] = useState(0);

  /**
   *
   **/
  useTrackPlayerEvents(EventTypes, async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        if (event.nextTrack !== undefined) {
          setCurrentTrack(undefined);
        } else {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          setCurrentTrack(track);
        }
        break;
      case Event.RemotePause:
        TrackPlayer.pause();
        break;
      case Event.RemotePlay:
        TrackPlayer.play();
        break;
      case Event.PlaybackQueueEnded:
        console.log('Playback ended');
        break;
    }
  });

  useEffect(() => {
    if (error) {
      console.log('Error somewhere at useMediaPlayer: ' + error);
    }
  }, [error]);

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
      playbackState === State.Playing || playbackState === State.Buffering;
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
  const isCurrentTrackPlaying = async (id: number): Promise<boolean> => {
    const current = await TrackPlayer.getCurrentTrack();
    return current === id && isPlaying;
  };
  /**
   * Get current track active in the queue
   * and dispatch it to the global store
   **/
  const getCurrentTrack = async (): Promise<Track | undefined> => {
    setError(null);
    try {
      const currentTrackIndex = await TrackPlayer.getCurrentTrack();
      if (!currentTrackIndex) {
        return undefined;
      }
      const current = await TrackPlayer.getTrack(currentTrackIndex);
      const song = new Song(
        current.id,
        current.title || '',
        current.artist || '',
        current.artwork?.toString() || '',
        current.duration || 0,
        current.url.toString() || '',
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
  const getVolume = async () => {
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
  const play = async () => {
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
  const playTrackById = async (id: number) => {
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
  const pauseTrack = async () => {
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
  const nextTrack = async () => {
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
  const addTrack = async (video: Video) => {
    setError(null);
    if (video === undefined) {
      return;
    }
    try {
      //Request playable url
      const playableLink = await getHighestAudioLink(video?.url || '', {
        quality: 'highestaudio',
      });

      const song = new Song(
        video.id,
        video.title,
        video.artist,
        video?.avatar || '',
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
  const removeTrack = async (index: number, song: Song) => {
    setError(null);
    try {
      await TrackPlayer.remove(index);
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
  };
};

export default useMediaPlayer;
