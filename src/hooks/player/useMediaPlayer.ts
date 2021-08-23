import { useEffect, useState } from 'react';
import * as actionsCreators from '../../state/actions/LibraryActions';
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
import {
  setCurrentSongPlaying,
  setIsPlaying,
} from '../../state/actions/PlayerActions';

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
  const { addSongToLibrary, deleteSongFromLibrary } = actionsCreators;

  //TrackPlayer Hooks
  const progress = useProgress();
  const playbackState = usePlaybackState();

  //States
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [position, setPosition] = useState(0);
  const [error, setError] = useState(null);

  const [duration, setDuration] = useState(0);
  const [volume, setVolumePosition] = useState(0);

  /**
   *
   **/
  useTrackPlayerEvents(EventTypes, async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        if (event.nextTrack !== undefined) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          setCurrentTrack(track);

          const song = new Song(
            track.id,
            track.title || '',
            track.artist || '',
            track.artwork?.toString() || '',
            track.duration || 0,
            track.url.toString(),
          );

          dispatch(setCurrentSongPlaying(song));
        } else {
          setCurrentTrack(undefined);
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
  }, []);

  /**
   * Effect that get fire everytime state of playback change
   **/
  useEffect(() => {
    const result =
      playbackState === State.Playing || playbackState === State.Buffering;
    dispatch(setIsPlaying(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return current === id && playbackState === State.Playing;
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
      /*
      const song = new Song(
        current.id,
        current.title || '',
        current.artist || '',
        current.artwork?.toString() || '',
        current.duration || 0,
        current.url.toString() || '',
      );
      */
      //dispatch(setCurrentSongPlaying(song));
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
      //dispatch(setVolumeState(result));
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
    console.log(id);
    setError(null);
    try {
      if (playbackState === State.Playing) {
        //await TrackPlayer.pause();
      }
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
      //dispatch(setVolumeState(value));
    } catch (err) {
      setError(err);
    }
  };

  /**
   * Add video from Youtube to queue.
   * 1. Attempt to get playable link
   * 2. Add video to track queue
   * */
  const addTrack = async (video: Video | undefined) => {
    if (video) {
      console.log('Running addTrack: ' + video.title);
      setError(null);
      if (video === undefined) {
        return;
      }
      try {
        const song = await createSong(video);

        if (!song) {
          return;
        }

        await TrackPlayer.add(song);
        await TrackPlayer.play();

        dispatch(addSongToLibrary(song));
      } catch (err) {
        console.error('useMediaPlayer-addTrack => ' + err);
        setError(err);
      }
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

  /**
   * Convert track to song type
   * */
  const createSong = async (track: Video) => {
    try {
      let url: string;
      if (isTrack(track)) {
        url = track.url.toString();
      } else {
        url = track.url?.toString() || '';
      }

      //Request playable url
      const playableLink = await getHighestAudioLink(url, {
        quality: 'highestaudio',
      });

      return new Song(
        track.id,
        track.title || '',
        track.artist || '',
        track?.avatar || '',
        track.duration || 0,
        playableLink,
      );
    } catch (err) {
      setError(err);
    }
  };

  const isTrack = (t: Track | Video): t is Track => {
    return (t as Track).type !== undefined;
  };

  return {
    position,
    duration,
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
