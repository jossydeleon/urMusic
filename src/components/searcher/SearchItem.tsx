import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import useHelpers from '../../hooks/util/useHelpers';
import {SearchVideoResult} from '../../model';
import {theme} from '../../theme/theme';
import TrackAvatar from '../TrackAvatar';

interface Props {
  video: SearchVideoResult;
  onPress: (video: SearchVideoResult) => void;
}

const SearchItem: React.FC<Props> = ({video, onPress}) => {
  //Hook helpers
  const {transformTitle, secondsToTimerFormat, formatDateToTimeAgo} =
    useHelpers();

  return (
    <ListItem
      containerStyle={styles.containerItem}
      onPress={() => onPress(video)}>
      <TrackAvatar
        duration={
          !video.isLive
            ? secondsToTimerFormat(video.duration.toString())
            : 'LIVE'
        }
        durationStyle={video.isLive && styles.liveTextStyle}
        artwork={video.avatar}
      />

      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {transformTitle(video.title, 45)}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {transformTitle(video.artist, 25)}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.date}>
          {formatDateToTimeAgo(video.publishedAt)}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: theme.colors.dark,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.font.listPrimarySize,
  },
  subtitle: {
    color: 'gray',
    fontSize: theme.font.listSecundarySize,
  },
  date: {
    color: 'gray',
    fontSize: theme.font.small,
  },
  liveTextStyle: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SearchItem;
