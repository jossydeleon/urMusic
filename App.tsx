/**
 * Created by @jdl_developer
 * Main Function to decide behavior of the app
 */

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StatusBar, StyleSheet, LogBox } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';
import { Provider as ReduxProvider } from 'react-redux';
import Store from './src/state/Store';
import TrackPlayer, { Capability } from 'react-native-track-player';

const App = () => {

  LogBox.ignoreAllLogs(true);

  /**
   * Effect to setup TrackPlayer
   */
  useEffect(() => {
    setUpTrackPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  /**
   * Set up a TrackPlayer
   */
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1000000, //1Gb by default
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
        ],
      });
    } catch (error) {
      console.log('setUpTrackPlayer: ', error);
    }
  };

  return (
    <SafeAreaProvider>
      <ReduxProvider store={Store}>
        <SafeAreaView style={[styles.container]}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={theme.colors.dark}
          />
          <RootNavigator />
        </SafeAreaView>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
});

export default App;
