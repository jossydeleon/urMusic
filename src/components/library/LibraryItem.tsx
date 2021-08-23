/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import useHelpers from '../../hooks/util/useHelpers';
import { theme } from '../../theme/theme';
import { BackgroundedButton } from '../styled';
import { ISong } from '../../types';
import { RootStore } from '../../state/Store';
import useMediaPlayer from '../../hooks/player/useMediaPlayer';

interface LibraryItemProps {
  song: ISong;
  position: number;
}

const LibraryItem: React.FC<LibraryItemProps> = ({
  song, position,
}) => {
  //Redux
  const { currentSongPlaying, isPlaying } = useSelector(
    (state: RootStore) => state.player,
  );

  //Hook media players
  const { pauseTrack, playTrackById, play, removeTrack } = useMediaPlayer();

  //Hook helpers
  const { transformTitle } = useHelpers();
  //State to update play/pause button
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);

  /**
   * Effect to check if this song is the current track.
   * */
  useEffect(() => {
    isTrackPlaying();
  }, [isPlaying, currentSongPlaying]);

  /**
   * Functions to check if this song is the current track.
   * */
  const isTrackPlaying = async () => {
    const result = currentSongPlaying?.id === song.id;
    if (result) {
      setIsThisSongPlaying(result && isPlaying);
    } else {
      setIsThisSongPlaying(false);
    }
  };

  /**
   * Play selected song
   **/
  const handlePlayPauseButton = async (index: number) => {
    if (currentSongPlaying?.id === song.id && isPlaying) {
      await pauseTrack();
    }
    else
      if (currentSongPlaying?.id === song.id && !isPlaying) {
        await play();
      }
      else {
        await playTrackById(index);
      }
  };

  /**
   * Delete song
   **/
  const handleDeleteSong = async (index: number, track: ISong) => {
    if (!song) {
      return;
    }
    await removeTrack(index, track);
  };

  //Button delete
  const ButtonDelete = () => (
    <Button
      icon={{ name: 'delete', color: 'white' }}
      buttonStyle={styles.buttonDelete}
      onPress={() => handleDeleteSong(position, song)}
    />
  );

  return (
    <ListItem.Swipeable
      containerStyle={styles.containerItem}
      onPress={() => handlePlayPauseButton(position)}
      leftContent={<ButtonDelete />}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {transformTitle(song.title, 40)}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.artist}>
          {transformTitle(song.artist, 25)}
        </ListItem.Subtitle>
      </ListItem.Content>

      <BackgroundedButton
        name={isThisSongPlaying ? 'pause' : 'play'}
        size={17}
        bgColor={isThisSongPlaying ? theme.colors.primary : theme.colors.dark}
        onPress={() => handlePlayPauseButton(position)}
      />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: 20,
    backgroundColor: theme.colors.darker,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.font.listPrimarySize,
  },
  artist: {
    color: 'gray',
    fontSize: theme.font.listSecundarySize,
  },
  buttonDelete: {
    minHeight: '100%',
    backgroundColor: 'red',
  },
});

export default LibraryItem;
