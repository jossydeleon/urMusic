import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
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
    try {
      tracks.map(async (item) => await addTrack(item));
    } catch (err) {
      console.error('Error trying to add track...', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>I am Demo Screen!</Text>
      <Button onPress={() => handleAddTrack(dummyVideos)} title="Add Playlist" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darker,
    paddingHorizontal: 10,
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 50,
  },
});

export default Demo;
