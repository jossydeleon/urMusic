import React, {useCallback, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import LibraryList from '../components/library/LibraryList';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import MiniPlayer from '../components/MiniPlayer';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const Library = ({navigation}) => {
    
  //Redux
  const {library, currentSongPlaying} = useSelector(state => state.player);

  //useMediaPlayer
  const {isPlaying, playTrackById, pauseTrack, removeTrack} = useMediaPlayer();

  /**
   * Play selected song
   **/
  const handlePlaySong = useCallback(async song => {
    if(isPlaying) {
      await pauseTrack();
    }
    else {
      await playTrackById(song.id)
    }
  }, []);

  /**
   * Delete song
   **/
  const handleDeleteSong = useCallback(async song => {
    if (!song) return;
    await removeTrack(song);
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
