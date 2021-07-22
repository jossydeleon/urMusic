import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../theme/theme';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

type Props = {
  title: string;
  artist: string;
  artwork: string;
  isLoading?: boolean;
};

const Cover = styled.Image`
  width: 120px;
  height: 120px;
  aspect-ratio: 1;
  border-radius: 10px;
  padding-bottom: 4px;
`;

const SubtitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderPopup: React.FC<Props> = ({isLoading=false, title, artist, artwork}) => {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Cover
          source={{
            uri: artwork,
          }}
        />
        <Text style={styles.h4}>{title}</Text>
        <SubtitleContainer>
          <Text style={styles.h5}>{artist}</Text>
          {isLoading && <ActivityIndicator
            color="gray"
            
          />}
        </SubtitleContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h4: {
    fontSize: theme.font.h5,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  h5: {
    fontSize: theme.font.h6,
    color: 'gray',
    textAlign: 'center',
    marginEnd:5
  },
});

HeaderPopup.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
};

export default HeaderPopup;
