import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {theme} from '../theme/theme';
import IconFontAwesome from './IconFontAwesome';
import SliderTrack from './SliderTrack';
import {Screens} from '../navigation';
import useHelpers from '../hooks/util/useHelpers';
import useMediaPlayer from '../hooks/player/useMediaPlayer';

const ParentContainer = styled.View``;

const Container = styled.View`
  border-width: 0.5px;
  border-bottom-color: black;
`;

const ContentPlayer = styled(ListItem).attrs({
  containerStyle: {
    backgroundColor: theme.colors.dark,
  },
})``;

const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const Author = styled.Text`
  color: gray;
  font-size: 13px;
`;

const MiniPlayer = ({navigator}) => {
  //useHelper
  const {transformTitle} = useHelpers();
  //Redux
  const {currentSongPlaying, isPlaying} = useSelector(state => state.player);
  //useMediaPlayer
  const {
    position,
    duration,
    nextTrack,
    previousTrack,
    play,
    pauseTrack,
  } = useMediaPlayer(true);

  /**
   * Navigate to MediaPlayer screen
   */
  const handleOnPressMiniPlayer = () => {
    navigator.push(Screens.MediaPlayer);
  };

  /**
   * Handle if play or pause  a current track on player
   **/
  const handlePlayPauseTrack = async () => {
    if (isPlaying && currentSongPlaying) {
      pauseTrack();
    } else if (currentSongPlaying) {
      play();
    }
  };

  /**
   * Handle skip to next track
   **/
  const handleNextTrack = async () => {
    await nextTrack();
  };

  /**
   * Handle skip to previous track
   **/
  const handleSkipTrack = async () => {
    await previousTrack();
  };

  return (
    <ParentContainer>
      <SliderTrack
        thumbTintColor={'transparent'}
        position={position}
        maxValue={duration}
        incrementBy={1}
      />
      <Container>
        <ContentPlayer onPress={handleOnPressMiniPlayer}>
          <Avatar
            rounded={true}
            source={{
              uri: currentSongPlaying?.artwork,
            }}
            size={50}
          />
          <ListItem.Content>
            <Title>{transformTitle(currentSongPlaying?.title, 32)}</Title>
            <Author>{'YouTube'}</Author>
          </ListItem.Content>

          <IconFontAwesome name="backward" onPress={handleSkipTrack} />
          <IconFontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={22}
            onPress={handlePlayPauseTrack}
          />
          <IconFontAwesome name="forward" onPress={handleNextTrack} />
        </ContentPlayer>
      </Container>
    </ParentContainer>
  );
};

export default MiniPlayer;
