import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

type HeaderPopupProps = {
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

const HeaderPopup: React.FC<HeaderPopupProps> = ({
  isLoading = false,
  title,
  artist,
  artwork,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Cover
          source={{
            uri: artwork,
          }}
        />
        <Text style={styles.h4}>{title}</Text>
        <SubtitleContainer>
          <Text style={styles.h5}>{artist}</Text>
          {isLoading && <ActivityIndicator color="gray" />}
        </SubtitleContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
    marginEnd: 5,
  },
});

export default HeaderPopup;
