import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import LibraryList from '../components/library/LibraryList';
import MiniPlayer from '../components/MiniPlayer';
import { BottomStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStore } from '../state/Store';
import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

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
  const { currentSongPlaying } = useSelector(
    (state: RootStore) => state.player,
  );

  const { playlist } = useSelector(
    (state: RootStore) => state.library,
  );

  useEffect(() => {
    read();
  }, []);

  const read = async () => {
    const tracks = await TrackPlayer.getQueue();
    console.log('Order of Queue');
    tracks.map((item) => console.log(item.title));
  };

  return (
    <Container>
      <ContentContainer>
        <LibraryList
          data={playlist}
        />
      </ContentContainer>
      {currentSongPlaying && <MiniPlayer navigator={navigation} />}
    </Container>
  );
};

export default Library;
