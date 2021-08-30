/**
 * Created by @jdl_developer
 * Bottom Stack Navigator that contains navigation bottom tabs,
 * as Home, Post, Profile, etc.
 */

import React, { Fragment, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import { IconFontAwesome, IconFontAwesomeFive } from '../components/IconFontAwesome';
import Home from '../screens/HomeWelcome';
import Library from '../screens/Library';
import Catcher from '../screens/Catcher';
import { theme } from '../theme/theme';
import HeaderLogo from '../components/HeaderLogo';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomStackParamList, MainStackParamList } from './types';
import {
  CATCHER_SCREEN,
  DEMO_SCREEN,
  HOME_WELCOME_SCREEN,
  LIBRARY_SCREEN,
  SEARCH_MUSIC_SCREEN,
  SETTINGS_SCREEN,
} from './routes';
import Demo from '../screens/Demo';

type BottomStackNavigationProps = StackNavigationProp<
  MainStackParamList,
  'HomeBottomNavigator'
>;

type BottomStackNavigationRouteProps = RouteProp<
  MainStackParamList,
  'HomeBottomNavigator'
>;

type BottomHomeProps = {
  navigation: BottomStackNavigationProps;
  route: BottomStackNavigationRouteProps;
};

//Create bottom navigation
const BottomTabs = createBottomTabNavigator<BottomStackParamList>();

/**
 *
 * Bottom Stack Navigation function
 */
const BottomStackNavigation: React.FC<BottomHomeProps> = ({
  navigation,
  route,
}) => {
  /**
   * Function to get name of current bottom tab
   * @param {*} name Title of current bottom tab
   */
  const getHeaderTitle = (newRoute: BottomStackNavigationRouteProps) => {
    const routeName =
      getFocusedRouteNameFromRoute(newRoute) ?? HOME_WELCOME_SCREEN;
    switch (routeName) {
      case LIBRARY_SCREEN:
        return 'My Library';
      default:
        return <HeaderLogo />;
    }
  };

  /**
   * Check if tab active is Home Screen
   * @param {*} newRoute
   * @returns
   */
  const isHomeScreen = (newRoute: BottomStackNavigationRouteProps) => {
    const routeName =
      getFocusedRouteNameFromRoute(newRoute) ?? HOME_WELCOME_SCREEN;
    if (routeName === HOME_WELCOME_SCREEN) {
      return true;
    }
    return false;
  };

  /**
   * Check if tab active is Home Screen
   * @param {*} newRoute
   * @returns
   */
  const isLibraryScreen = (newRoute: BottomStackNavigationRouteProps) => {
    const routeName =
      getFocusedRouteNameFromRoute(newRoute) ?? HOME_WELCOME_SCREEN;
    if (routeName === LIBRARY_SCREEN) {
      return true;
    }
    return false;
  };

  /**
   * Navigate to a custom screen
   * @param {*} newRoute route to navigate
   */
  const handleNavigation = (newRoute: keyof MainStackParamList) => {
    navigation.push(newRoute);
  };

  /**
   * useLayoutEffect to change title of header
   * When bottom navigation tab is changed.
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isLibraryScreen(route)
          ? theme.colors.darker
          : theme.colors.dark,
      },

      //@ts-ignore
      headerTitle: getHeaderTitle(route),
      headerLeft: () => {
        if (!isHomeScreen(route)) {
          return null;
        }

        return (
          <TouchableOpacity
            style={styles.iconLeftPadding}
            onPress={() => handleNavigation(SETTINGS_SCREEN)}>
            <IconFontAwesome name="sliders-h" color="white" />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={styles.iconRigthPadding}
            onPress={() => handleNavigation(SEARCH_MUSIC_SCREEN)}>
            <IconFontAwesome name="search" color="white" size={19} />
          </TouchableOpacity>
        );
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route]);

  return (
    <Fragment>
      <BottomTabs.Navigator
        initialRouteName={HOME_WELCOME_SCREEN}
        //screenOptions={{ gestureEnabled: true, }}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'white',
          style: {
            backgroundColor: theme.colors.dark,
            borderTopColor: theme.colors.dark,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: theme.colors.darker,
        }}>
        <BottomTabs.Screen
          name={HOME_WELCOME_SCREEN}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <IconFontAwesome name="home" color={color} size={18} />
            ),
          }}
        />

        <BottomTabs.Screen
          name={CATCHER_SCREEN}
          component={Catcher}
          options={{
            tabBarIcon: ({ color }) => (
              <IconFontAwesomeFive name="cloud-download-alt" color={color} size={18} />
            ),
          }}
        />

        <BottomTabs.Screen
          name={LIBRARY_SCREEN}
          component={Library}
          options={{
            tabBarIcon: ({ color }) => (
              <IconFontAwesome name="music" color={color} size={18} />
            ),
          }}
        />

        <BottomTabs.Screen
          name={DEMO_SCREEN}
          component={Demo}
          options={{
            tabBarIcon: ({ color }) => (
              <IconFontAwesome name="bug" color={color} size={18} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  iconRigthPadding: {
    right: 18,
  },
  iconLeftPadding: {
    left: 18,
  },
});

export default BottomStackNavigation;
