import React, { useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import ArtSlider from '../components/ArtSlider';
import { IconFontAwesome } from '../components/IconFontAwesome';
import SliderTrack from '../components/SliderTrack';
import { BackButton } from '../components/BackButton';
import { theme } from '../theme/theme';
import useHelpers from '../hooks/util/useHelpers';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { RootStore } from '../state/Store';
import ToggleButton from '../components/ToggleButton';
import BackgroundedButton from '../components/BackgroundedButton';

const Container = styled.View`
  flex: 1;
  padding-top: 3%;
  background-color: ${theme.colors.dark};
`;

const ContainerPanelControl = styled.View`
  background-color: ${theme.colors.dark};
  padding-bottom: 9%;
`;

const Title = styled.Text`
  color: white;
  font-size: 19px;
  font-weight: bold;
  text-align: center;
`;

const Author = styled.Text`
  color: gray;
  font-size: 15px;
  text-align: center;
`;

const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
`;

const AudioControl = styled.View`
  flex-direction: row;
  padding-left: 50px;
  padding-right: 50px;
  align-items: center;
  justify-content: space-between;
`;

const LoadingContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
`;

type MediaPlayerScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'MediaPlayer'
>;

type MediaPlayerProps = {
  navigation: MediaPlayerScreenNavigationProp;
};

const MediaPlayer: React.FC<MediaPlayerProps> = ({ navigation }) => {
  //Hook Helper
  const { transformTitle } = useHelpers();

  //Redux
  const { currentSongPlaying, isPlaying, repeatMode } = useSelector(
    (state: RootStore) => state.player,
  );
  //const { } = actionsCreator.playerActions;

  //useMediaPlayer
  const {
    position,
    duration,
    volume,
    nextTrack,
    previousTrack,
    play,
    pauseTrack,
    seekTo,
    setVolume,
    setRepeatModeOff,
    setRepeatModeQueue,
  } = useMediaPlayer(true);

  /*
  useEffect(() => {
    let timer = setTimeout(() => setValue(value + 1), 1000);
    console.log(value)
    if(value> TOTAL) setValue(0)
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
*/

  /**
   * Layout effect to add a custom header.
   * This effect run before mounting component
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Now Playing',
      //headerHeight: 60,
      headerBackImage: props => (
        <BackButton name="chevron-left" size={20} {...props} />
      ),
    });
  }, [navigation]);

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

  /**
   *
   **/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSeekTo = async (value: number) => {
    await seekTo(value);
  };

  /**
   * Handle phone volume
   **/
  const handleVolume = async (value: number) => {
    await setVolume(value);
  };

  const handleRepeatMode = async () => {
    if (repeatMode === 'off') {
      await setRepeatModeQueue();
    }
    else {
      await setRepeatModeOff();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Container>
        <LoadingContainer>
          <ActivityIndicator animating={false} />
        </LoadingContainer>
        <ArtSlider
          albumArt={currentSongPlaying?.artwork || ''}
          currentSeconds={position}
          durationInSeconds={duration}
        />
        <Title>{transformTitle(currentSongPlaying?.title || '', 35)}</Title>
        <Author>YouTube</Author>
      </Container>
      <ContainerPanelControl>
        <Box>
          <IconFontAwesome name="heart" />
          <IconFontAwesome name="music" />
        </Box>
        <Box>
          <IconFontAwesome name="random" />

          <ToggleButton
            icon="backward"
            onPress={handleSkipTrack}
          />

          <BackgroundedButton
            name={isPlaying ? 'pause' : 'play'}
            bgColor={theme.colors.primary}
            onPress={handlePlayPauseTrack}
          />

          <ToggleButton
            icon="forward"
            onPress={handleNextTrack}
          />

          <ToggleButton
            icon="sync"
            color={repeatMode === 'off' ? 'white' : theme.colors.primary}
            onPress={handleRepeatMode}
          />

        </Box>
        <AudioControl>
          <IconFontAwesome
            name="volume-off"
            style={styles.iconPadding}
            color={theme.colors.primary}
          />
          <SliderTrack
            position={volume}
            maxValue={1}
            onChangePosition={handleVolume}
          />
          <IconFontAwesome
            name="volume-up"
            style={styles.iconPadding}
            color={theme.colors.primary}
          />
        </AudioControl>
      </ContainerPanelControl>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconPadding: {
    marginLeft: 12,
  },
});

export default MediaPlayer;
