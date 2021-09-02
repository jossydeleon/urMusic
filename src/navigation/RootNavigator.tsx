import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './MainStackNavigation';
import TrackPlayer, { Capability, RepeatMode } from 'react-native-track-player';
import { useSelector } from 'react-redux';
import { RootStore } from '../state/Store';

const RootNavigator = () => {

  //Selectors
  const { maxCacheSize } = useSelector((state: RootStore) => state.settings);
  const { repeatMode, volume } = useSelector((state: RootStore) => state.player);
  const { playlist } = useSelector((state: RootStore) => state.library);

  /**
   * Effect to create and destroy TrackPlayer
   */
  useEffect(() => {
    setUpTrackPlayer();
    return () => TrackPlayer.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Set up a TrackPlayer
   */
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: maxCacheSize,
      });
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
          Capability.PlayFromId,
          Capability.PlayFromSearch,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          //Capability.Stop,
          Capability.SeekTo,
          Capability.PlayFromId,
          Capability.PlayFromSearch,
        ],
      });

      //Load Library
      await TrackPlayer.add(playlist);

      //Load Player settings
      await TrackPlayer.setRepeatMode(repeatMode === 'off' ? RepeatMode.Off : RepeatMode.Queue);
      await TrackPlayer.setVolume(volume);

    } catch (error) {
      console.log('setUpTrackPlayer: ', error);
    }
  };

  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
