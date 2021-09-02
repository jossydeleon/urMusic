import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  StyleProp,
  TextStyle,
} from 'react-native';
import styled from 'styled-components/native';

const ContainerText = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 2px;
`;

interface Props {
  artwork: string;
  duration?: number | string;
  durationStyle?: StyleProp<TextStyle>;
}

const TrackAvatar: React.FC<Props> = ({ artwork, duration, durationStyle }) => {
  return (
    <ImageBackground source={{ uri: artwork }} style={styles.imageContainer}>
      <ContainerText>
        {duration && <Text style={[styles.duration, durationStyle]}>{duration}</Text>}
      </ContainerText>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  duration: {
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    aspectRatio: 1,
  },
});

export default TrackAvatar;
