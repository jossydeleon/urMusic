import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../theme/theme';

const Demo = ({}) => {
  
  return (
    <View style={styles.container}>
      
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
