/**
 * Created by @jdl_developer
 * Main Stack Navigator that contains main navigation of the app
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme/theme.js';
import MediaPlayer from '../screens/MediaPlayer';
import Settings from '../screens/Settings';
import SearchMusic from '../screens/SearchMusic';
import { BackButton } from '../components/BackButton';
import Demo from '../screens/Demo';
import {
  DEMO_SCREEN,
  HOME_BOTTOM_NAVIGATOR,
  MEDIA_PLAYER_SCREEN,
  SEARCH_MUSIC_SCREEN,
  SETTINGS_SCREEN,
} from './routes';
import { MainStackParamList } from './types';
import BottomStackNavigation from './BottomStackNavigation';

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME_BOTTOM_NAVIGATOR}
      mode="modal"
      headerMode="screen"
      screenOptions={{
        gestureEnabled: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.dark,
          shadowColor: 'transparent', //Remove bottom line for iOs
          elevation: 0, //Remove bottom line for Android
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontSize: theme.font.headerSize,
          fontWeight: 'bold',
        },
        headerBackImage: props => (
          <BackButton name="chevron-left" size={20} {...props} />
        ),
      }}>
      <Stack.Screen
        name={HOME_BOTTOM_NAVIGATOR}
        component={BottomStackNavigation}
      />

      <Stack.Screen
        name={MEDIA_PLAYER_SCREEN}
        component={MediaPlayer}
        options={({ route }) => ({
          title: route.params?.name || 'Now Playing',
        })}
      />

      <Stack.Screen
        name={SEARCH_MUSIC_SCREEN}
        component={SearchMusic}
        options={{
          title: 'Search',
        }}
      />

      <Stack.Screen
        name={SETTINGS_SCREEN}
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />

      <Stack.Screen
        name={DEMO_SCREEN}
        component={Demo}
        options={{
          title: 'Demo',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
