import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import useMediaPlayer from '../../hooks/player/useMediaPlayer';
import useHelpers from '../../hooks/util/useHelpers';
import {theme} from '../../theme/theme';
import {BackgroundedButton} from '../styled';

const LibraryItem = ({song, onPlay, onDelete}) => {
  //Redux
  const {currentSongPlaying, isPlaying} = useSelector(state => state.player);
  //Hook helpers
  const {transformTitle} = useHelpers();
  //Hook Media
  const {isCurrentTrackPlaying} = useMediaPlayer();
  //State to update play/pause button
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);

  /**
   * Effect to check if this song is the current track.
   * */
  useEffect(() => {
    isTrackPlaying();
  }, [isPlaying]);

  /**
   * Functions to check if this song is the current track.
   * */
  const isTrackPlaying = async () => {
    const result = currentSongPlaying.id === song.id;
    if (result) {
      setIsThisSongPlaying(true);
    } else {
      setIsThisSongPlaying(false);
    }
  };

  //Button delete
  const ButtonDelete = () => (
    <Button
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.buttonDelete}
      onPress={() => onDelete(song)}
    />
  );

  return (
    <ListItem.Swipeable
      containerStyle={styles.containerItem}
      onPress={onPlay}
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
        onPress={() => onPlay(song)}
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
