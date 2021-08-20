/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { default as MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { default as FontAwesome } from 'react-native-vector-icons/FontAwesome';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';

//Load Font Awesome
FontAwesome.loadFont();
//Load Material Icons
MaterialIcons.loadFont();
//Load Ionicons Icons
Ionicons.loadFont();

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>
  require('./src/services/service-player'),
);
