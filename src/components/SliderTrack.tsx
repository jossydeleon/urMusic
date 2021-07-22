import React from 'react';
import {Slider} from 'react-native-elements';
import {theme} from '../theme/theme';

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
      style={{flex: 1}}
      trackStyle={{height: 3, backgroundColor: 'transparent'}}
      thumbTintColor={thumbTintColor || theme.colors.primary}
      thumbStyle={{height: 10, width: 10}}
      minimumTrackTintColor={trackTintColor || theme.colors.primary}
      step={incrementBy}
      minimumValue={0}
      maximumValue={maxValue}
      value={position}
      onValueChange={onChangePosition}
    />
  );
};

export default SliderTrack;
