import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { theme } from '../../theme/theme';
import IconFontAwesome from '../IconFontAwesome';

interface Props {
  item:string;
  onSelectItem: (item:string) => void;
}

export const AutocompleteItem: React.FunctionComponent<Props> = ({item, onSelectItem}) => (
    <ListItem
      containerStyle={{backgroundColor: theme.colors.darker}}
      bottomDivider
      onPress={() => onSelectItem(item)}>
      <IconFontAwesome name="music" />
      <ListItem.Content>
        <ListItem.Title style={styles.suggestionText}>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const styles = StyleSheet.create({
    suggestionText: {
      color: 'white',
    },
  });