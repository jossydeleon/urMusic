/**
 * Created by @jdl_developer
 * Bottom Stack Navigator that contains navigation bottom tabs,
 * as Home, Post, Profile, etc.
 */

import React, {Fragment, useLayoutEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import IconFontAwesome from '../components/IconFontAwesome';
import Home from '../screens/Home';
import Library from '../screens/Library';
import {theme} from '../theme/theme';
import {Screens} from './index';
import HeaderLogo from '../components/HeaderLogo';
import Catcher from '../screens/Catcher';
import { SearchHeader } from '../components/searcher';

//Create bottom navigation
const BottomTabs = createBottomTabNavigator();

/**
 *
 * Bottom Stack Navigation function
 */
export default function BottomStackNavigation({navigation, route}) {
  /**
   * Function to get name of current bottom tab
   * @param {*} name Title of current bottom tab
   */
  const getHeaderTitle = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? Screens.Home;
    switch (routeName) {
      case Screens.Home:
        return <HeaderLogo />;
      case Screens.SearchMusic:
        return 'Search';
      case Screens.Catcher:
        return <HeaderLogo />;
      case Screens.Library:
        return 'My Library';
    }
  };

  /**
   * Check if tab active is Home Screen
   * @param {*} route
   * @returns
   */
  const isHomeScreen = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? Screens.Home;
    if (routeName === Screens.Home) {
      return true;
    }
    return false;
  };

  /**
   * Check if tab active is Home Screen
   * @param {*} route
   * @returns
   */
   const isLibraryScreen = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? Screens.Home;
    if (routeName === Screens.Library) {
      return true;
    }
    return false;
  };

  /**
   * Navigate to a custom screen
   * @param {*} route route to navigate
   */
  const handleNavigation = route => {
    navigation.push(route);
  };

  /**
   * useLayoutEffect to change title of header
   * When bottom navigation tab is changed.
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isLibraryScreen(route) ? theme.colors.darker : theme.colors.dark 
      },

      headerTitle: getHeaderTitle(route),
      headerLeft: () => {
        if (!isHomeScreen(route)) return null;

        return (
          <TouchableOpacity
            style={{left: 18}}
            onPress={() => handleNavigation(Screens.Settings)}>
            <IconFontAwesome name="sliders-h" color="white" />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{right: 18}}
            onPress={() => handleNavigation(Screens.SearchMusic)}>
            <IconFontAwesome name="search" color="white" size={19}/>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, route]);

  return (
    <Fragment>
      <BottomTabs.Navigator
        initialRouteName={Screens.Home}
        screenOptions={{
          gestureEnabled: true,
        }}
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
          name={Screens.Home}
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFontAwesome name="home" color={color} size={18} />
            ),
          }}
        />

        <BottomTabs.Screen
          name={Screens.Catcher}
          component={Catcher}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFontAwesome name="youtube" color={color} size={18} />
            ),
          }}
        />

        <BottomTabs.Screen
          name={Screens.Library}
          component={Library}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFontAwesome name="music" color={color} size={18} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </Fragment>
  );
}
