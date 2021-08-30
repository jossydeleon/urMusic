import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import { RootStore } from '../state/Store';
import { theme } from '../theme/theme';

const Settings: React.FC = () => {

  const { player } = useSelector((state: RootStore) => state);
  const { repeatMode } = player;

  const { } = useMediaPlayer();

  const options = [
    {
      title: 'Repeat Mode',
      subtitle: 'Repeat playlist when last song is played',
      func: () => console.log('Repeat Mode'),
    },
    {
      title: 'Cache Size',
      subtitle: 'Maximum cache size to storage music downloaded',
      func: () => console.log('Cache Size'),
    },
    {
      title: 'Wait for Buffer',
      subtitle: 'If you notice that network media immediately pauses after it buffers, activating this may help.',
      func: () => console.log('Wait for Buffer'),
    },
    {
      title: 'About urMusic',
      func: () => console.log('About'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Container>
        {
          options.map((item, index) => (
            <ListItem key={index} containerStyle={styles.item}>
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {item.title}
                </ListItem.Title>
                {item.subtitle && <ListItem.Subtitle style={styles.subtitle}>
                  {item.subtitle}
                </ListItem.Subtitle>}
              </ListItem.Content>
              <Switch
                trackColor={{ false: theme.colors.gray, true: theme.colors.primary }}
                thumbColor={repeatMode === 'off' ? theme.colors.lightgray : theme.colors.primary}
                ios_backgroundColor="#3e3e3e"
                value={repeatMode === 'queue'}
              />
            </ListItem>
          ))
        }
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: theme.colors.dark,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'silver',
  },
});

const Container = styled.View`
  flex: 1;
  padding-top: 3%;
  background-color: ${theme.colors.dark};
`;

export default Settings;
