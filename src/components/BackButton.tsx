/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Icon, IconProps } from 'react-native-elements';
import { theme } from '../theme/theme';

interface Props extends IconProps {
  left?: number;
  padding?: number;
  bgColor?: string;
  onPress?: () => void;
}

export const BackButton: React.FC<Props> = ({ left, padding, bgColor, onPress, ...props }) => {
  return (
    <Icon
      type="font-awesome-5"
      color="white"
      onPress={onPress}
      containerStyle={{
        marginLeft: left || 0,
        padding: padding || 11,
        backgroundColor: bgColor || theme.colors.darker,
        borderRadius: 10,
      }}
      {...props} />
  );
};
