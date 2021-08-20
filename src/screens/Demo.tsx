import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme/theme';

const Demo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>I am Demo Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darker,
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 50,
  },
});

export default Demo;
