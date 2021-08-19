/**
 * Created by @jdl_developer
 * Main Function to decide behavior of the app
 */

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';
import TrackPlayer from 'react-native-track-player';

const App = () => {
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
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true, //TODO True for Android
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_PLAY_FROM_ID,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      });
    } catch (error) {
      console.log('setUpTrackPlayer: ', error);
    }
  };

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
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