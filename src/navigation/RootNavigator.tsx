import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './MainStackNavigation';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
