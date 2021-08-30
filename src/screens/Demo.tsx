import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import BackgroundedButton from '../components/BackgroundedButton';
import { dummyVideos } from '../dummy';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import { Video } from '../hooks/util/react-usetube/types';
import { RootStore } from '../state/Store';
import { theme } from '../theme/theme';

const Demo: React.FC = () => {
  const { addTrack } = useMediaPlayer();

  const { currentSongPlaying } = useSelector((state: RootStore) => state.player);

  useEffect(() => {
    if (currentSongPlaying) {
      console.log('Current Song Playing: ' + currentSongPlaying.title);
    }
  }, [currentSongPlaying]);

  const handleAddTrack = async (tracks: Video[]) => {
    console.log('Adding Tracks');
    for await (const track of tracks) {
      addTrack(track);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Add Dummy Music</Text>
      <BackgroundedButton name="music" backgroundColor={theme.colors.primary} onPress={() => handleAddTrack(dummyVideos)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darker,
    paddingHorizontal: 50,
    padding: 20,
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
});

export default Demo;
