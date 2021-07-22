import {useEffect, useState} from 'react';
import actionsCreators from '../../redux/actions';
import {useDispatch} from 'react-redux';
import useYtdl from '../util/useYtdl';
import TrackPlayer, {
  TrackPlayerEvents,
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
  useWhenPlaybackStateChanges,
} from 'react-native-track-player';
import {SearchVideoResult, Song} from '../../model';

const EventTypes = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
];

const useMediaPlayer = (isMediaPlayerComponent = false) => {
  //Hook Youtube catcher link
  const {getHighestAudioLink} = useYtdl();

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

  // invert binary tree

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

  useWhenPlaybackStateChanges(() => {
    setPlaybackChange(Date.now());
  });

  /**
   * Effect to run initial functions
   **/
  useEffect(() => {
    getVolume();
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
  }, [playbackState]);

  /**
   * Effect that gets fire everytime currentTrack is changed
   * */
  useEffect(() => {
    getCurrentTrack();
  }, [currentTrack]);

  /**
   * Effect to set current duration in seconds of a track
   * */
  useEffect(() => {
    if (!isMediaPlayerComponent) return;
    setDuration(progress.duration);
  }, [progress.duration]);

  /**
   * Effect to set current position in seconds of a track
   * */
  useEffect(() => {
    if (!isMediaPlayerComponent) return;
    setPosition(progress.position);
  }, [progress.position]);

  /**
   * Return if track sent by id is playing.
   * */
  const isCurrentTrackPlaying = async (id: string): Promise<boolean> => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    return currentTrack === id && isPlaying;
  };
  /**
   * Get current track active in the queue
   * and dispatch it to the global store
   **/
  const getCurrentTrack = async (): Promise<TrackPlayer.Track | undefined> => {
    setError(null);
    try {
      const id = await TrackPlayer.getCurrentTrack();
      if (!id) return undefined;
      const current = await TrackPlayer.getTrack(id);
      dispatch(setCurrentSongPlaying(current));
      return current;
    } catch (error) {
      setError(error);
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
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Play current track
   **/
  const play = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.play();
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Play track by Id
   * */
  const playTrackById = async (id: string): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.skip(id);
    } catch (error) {
      setError(error);
      console.error('PlayTrackById: ' + error);
    }
  };

  /**
   * Pause current track
   **/
  const pauseTrack = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.pause();
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Skip to next track
   **/
  const nextTrack = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Skip to previous track
   **/
  const previousTrack = async (): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      setError(error);
    }
  };

  const seekTo = async (position: number): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Set volume
   * @param volume
   **/
  const setVolume = async (volume: number): Promise<void> => {
    setError(null);
    try {
      await TrackPlayer.setVolume(volume);
      dispatch(setVolumeState(volume));
    } catch (error) {
      setError(error);
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

      const {id, title, artist, duration, avatar} = video;
      const song = new Song(
        id,
        title,
        artist,
        avatar,
        duration,
        playableLink,
      );

      await TrackPlayer.add(song);
      await TrackPlayer.play();

      dispatch(addSongToLibrary(song));
    } catch (error) {
      console.error('useMediaPlayer-addTrack => ' + error);
      setError(error);
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
      dispatch(deleteSongFromLibrary(song.id));
    } catch (error) {
      console.error('useMediaPlayer-removeTrack => ' + error);
      setError(error);
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
