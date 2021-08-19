import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import CircleSlider from 'react-native-circle-slider';
import { Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';

const Container = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

const xCenter = Dimensions.get('window').width / 2;
const bR = 10;
const dR = wp('30%');

interface Props {
  albumArt: string;
  currentSeconds: number;
  durationInSeconds: number;
  onSeekTo?: (x: number) => number;
}

const ArtSlider: React.FC<Props> = ({
  albumArt,
  currentSeconds = 0,
  durationInSeconds = 0,
  onSeekTo,
}) => {
  return (
    <Container>
      <CircleSlider
        btnRadius={bR}
        dialRadius={dR}
        meterColor={theme.colors.primary}
        value={currentSeconds}
        strokeWidth={5}
        strokeColor={theme.colors.darkgray}
        durationInSeconds={durationInSeconds}
        showText={false}
        hideThumb={true}
        onValueChange={onSeekTo}
      />

      <Avatar
        rounded
        source={{ uri: albumArt }}
        size={xCenter}
        containerStyle={styles.avatarContainer}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    top: xCenter / 6.5, //before dR = 30%, top xCenter/5
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
  },
});

export default ArtSlider;
