import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconFontAwesome from '../IconFontAwesome';
import styled from 'styled-components/native';

type Props = {
  options:any
  onCancel:() => void
}

const CancelContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const ContentPopup: React.FC<Props> = ({options, onCancel}) => {
  return (
    <View style={{paddingBottom: 10}}>
      {options.map((option:any, index:number) => (
        <View key={index} style={styles.listContainer}>
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={option.func}>
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
        <TouchableOpacity onPress={onCancel} style={{padding: 15}}>
          <Text style={styles.itemCancel}>{'Close'}</Text>
        </TouchableOpacity>
      </CancelContainer>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

ContentPopup.propTypes = {
  options: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ContentPopup;
