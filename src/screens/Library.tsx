import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import LibraryList from '../components/library/LibraryList';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import MiniPlayer from '../components/MiniPlayer';
import { IPlayerState } from '../types';
import { BottomStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

type LibraryScreenNavigationProp = StackNavigationProp<
  BottomStackParamList,
  'Library'
>;

type LibraryProps = {
  navigation: LibraryScreenNavigationProp;
};

const Library: React.FC<LibraryProps> = ({ navigation }) => {
  //Redux
  const { library, currentSongPlaying } = useSelector(
    (state: IPlayerState) => state,
  );

  //useMediaPlayer
  const { isPlaying, playTrackById, pauseTrack, removeTrack } =
    useMediaPlayer();

  /**
   * Play selected song
   **/
  const handlePlaySong = useCallback(async song => {
    if (isPlaying) {
      await pauseTrack();
    } else {
      await playTrackById(song.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Delete song
   **/
  const handleDeleteSong = useCallback(async song => {
    if (!song) {
      return;
    }
    await removeTrack(song);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ContentContainer>
        <LibraryList
          data={library}
          onPlay={handlePlaySong}
          onDelete={handleDeleteSong}
        />
      </ContentContainer>
      {currentSongPlaying && <MiniPlayer navigator={navigation} />}
    </Container>
  );
};

export default Library;
