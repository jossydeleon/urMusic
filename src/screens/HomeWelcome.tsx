import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import MiniPlayer from '../components/MiniPlayer';
import { theme } from '../theme/theme';
import { BottomStackParamList } from '../navigation/types';
import { RootStore } from '../state/Store';
import SongList from '../components/home/SongList';

const Container = styled.View`
  flex: 1;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const HomeContainer = styled.View`
  flex: 1;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
`;

type HomeScreenNavigationProp = StackNavigationProp<
  BottomStackParamList,
  'HomeWelcome'
>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeWelcome: React.FC<HomeProps> = ({ navigation }) => {

  //Redux
  const { currentSongPlaying } = useSelector((state: RootStore) => state.player);
  const { playlist } = useSelector((state: RootStore) => state.library);

  return (
    <Container>
      {
        playlist.length === 0 && <EmptyContainer>
          <Text style={styles.h4}>Looking for free music?</Text>
          <Text style={styles.h5}>
            Music you search from YouTube will appear here.
          </Text>
        </EmptyContainer>
      }
      {
        playlist.length && <HomeContainer>
          <Text style={styles.heading}>Recently Added</Text>
          <SongList songs={playlist.slice(0, 5)} />
          <Text style={styles.heading}>Recently Searched</Text>
          <SongList songs={playlist.slice(5, 10)} />
        </HomeContainer>
      }
      {currentSongPlaying && <MiniPlayer navigator={navigation} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: theme.font.h4,
    color: 'white',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: theme.font.h4,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  h5: {
    fontSize: theme.font.h6,
    color: 'gray',
    textAlign: 'center',
  },
});

export default HomeWelcome;
