import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from '../theme/theme';
import MainStackNavigation from './MainStackNavigation';

const RootNavigator = () => {

  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
