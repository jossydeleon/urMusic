/**
 * Created by @jdl_developer
 * Main Stack Navigator that contains main navigation of the app
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from '../theme/theme.js';
import BottomStackNavigation from './BottomStackNavigation.js';
import MediaPlayer from '../screens/MediaPlayer';
import Settings from '../screens/Settings';
import {Screens} from '.';
import SearchMusic from '../screens/SearchMusic';
import {BackgroundedButton} from '../components/styled';
import Demo from '../screens/Demo.js';

const Stack = createStackNavigator();

export default function MainStackNavigation() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      initialRouteName={Screens.Home}
      screenOptions={{
        //gestureEnabled: true,
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
          <BackgroundedButton name="chevron-left" size={20} {...props} />
        ),
      }}>
      <Stack.Screen name={Screens.Home} component={BottomStackNavigation} />

      <Stack.Screen
        name={Screens.MediaPlayer}
        component={MediaPlayer}
        options={({route}) => ({
          title: route.params?.name || 'Now Playing',
        })}
      />

      <Stack.Screen
        name={Screens.SearchMusic}
        component={SearchMusic}
        options={{
          title: 'Search',
        }}
      />

      <Stack.Screen
        name={Screens.Settings}
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />

      <Stack.Screen
        name={Screens.Demo}
        component={Demo}
        options={{
          title: 'Demo',
        }}
      />
    </Stack.Navigator>
  );
}
