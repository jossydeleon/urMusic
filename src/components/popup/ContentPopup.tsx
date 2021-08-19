import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconFontAwesome from '../IconFontAwesome';
import styled from 'styled-components/native';
import { OptionsProps } from './types';

interface PopupProps {
  options: OptionsProps[];
  onCancel: () => void;
}

const CancelContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const ContentPopup: React.FC<PopupProps> = ({ options, onCancel }) => {
  return (
    <View style={styles.container}>
      {options.map((option: OptionsProps, index: number) => (
        <View key={index} style={styles.listContainer}>
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => option.func}>
            <IconFontAwesome
              name={option.icon}
              color="gray"
              size={14}
              containerStyle={styles.listIcon}
            />
            <Text style={styles.listText}>{option.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <CancelContainer>
        <TouchableOpacity onPress={onCancel} style={styles.containerOpacity}>
          <Text style={styles.itemCancel}>{'Close'}</Text>
        </TouchableOpacity>
      </CancelContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  listContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listText: {
    color: 'white',
  },
  listIcon: {
    paddingRight: 15,
  },
  itemCancel: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: 'white',
  },
  containerOpacity: {
    padding: 15,
  },
});

ContentPopup.propTypes = {
  options: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ContentPopup;
