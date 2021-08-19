import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import MiniPlayer from '../components/MiniPlayer';
import { theme } from '../theme/theme';
import { IPlayerState } from '../types';
import { BottomStackParamList } from '../navigation/types';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
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
  const { currentSongPlaying } = useSelector((state: IPlayerState) => state);

  return (
    <Container>
      <ContentContainer>
        <Text style={styles.h4}>Looking for free music?</Text>
        <Text style={styles.h5}>
          Music you search from YouTube will appear here.
        </Text>
      </ContentContainer>
      {currentSongPlaying && <MiniPlayer navigator={navigation} />}
    </Container>
  );
};

const styles = StyleSheet.create({
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
