import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const logo = require('../assets/logo_small.png');

const HeaderLogo = () => {
  return (
    <View>
      <Image source={logo} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 100,
  },
});

export default HeaderLogo;
