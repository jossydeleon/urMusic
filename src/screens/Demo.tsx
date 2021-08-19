import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme/theme';

const Demo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Demo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darker,
  },
});

export default Demo;
