/**
 * Created by @jdl_developer
 * Main Function to decide behavior of the app
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StatusBar, StyleSheet, LogBox } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';
import { Provider as ReduxProvider } from 'react-redux';
import Store, { persistor } from './src/state/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  LogBox.ignoreAllLogs(true);

  //persistor.purge();

  return (
    <SafeAreaProvider>
      <ReduxProvider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={[styles.container]}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={theme.colors.dark}
            />
            <RootNavigator />
          </SafeAreaView>
        </PersistGate>
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
