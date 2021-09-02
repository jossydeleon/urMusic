import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackgroundedButton from '../components/BackgroundedButton';
import { dummyVideos } from '../dummy';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import { Video } from '../hooks/util/react-usetube/types';
import { theme } from '../theme/theme';

const Demo: React.FC = () => {
  const { addLibrary, createSong } = useMediaPlayer();

  const handleAddTrack = async (videos: Video[]) => {
    console.log('Adding Tracks to Library');
    const songs = Promise.all(videos.map(video => createSong(video)));
    addLibrary(await songs);
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
