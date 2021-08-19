import React from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { theme } from '../theme/theme';

interface Props {
  trackTintColor?: string;
  thumbTintColor?: string;
  incrementBy?: number;
  position: number;
  maxValue: number;
  onChangePosition: (x: number) => void;
}

const SliderTrack: React.FC<Props> = ({
  trackTintColor,
  thumbTintColor,
  incrementBy = 0.1,
  position = 0,
  maxValue = 100,
  onChangePosition,
}) => {
  return (
    <Slider
      style={styles.container}
      trackStyle={styles.trackContainer}
      thumbTintColor={thumbTintColor || theme.colors.primary}
      thumbStyle={styles.thumbStyle}
      minimumTrackTintColor={trackTintColor || theme.colors.primary}
      step={incrementBy}
      minimumValue={0}
      maximumValue={maxValue}
      value={position}
      onValueChange={onChangePosition}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trackContainer: {
    height: 3,
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    height: 10,
    width: 10,
  },
});

export default SliderTrack;
