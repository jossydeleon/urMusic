import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import MiniPlayer from '../components/MiniPlayer';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import { theme } from '../theme/theme';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const Home = ({ navigation }) => {

  //Redux
  const { currentSongPlaying } = useSelector(state => state.player);

  //Hook useMediaPlayer
  const { currentTrack } = useMediaPlayer();

  return (
    <Container>
      <ContentContainer>
        <Text style={styles.h4}>Looking for free music?</Text>
        <Text style={styles.h5}>Music you search from YouTube will appear here.</Text>
      </ContentContainer>
      { currentSongPlaying && <MiniPlayer navigator={navigation} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  h4: {
    fontSize: theme.font.h4,
    color:'white',
    textAlign:"center",
    fontWeight:'bold'
  },
  h5: {
    fontSize: theme.font.h6,
    color: 'gray',
    textAlign:'center',
  }
})

export default Home;
