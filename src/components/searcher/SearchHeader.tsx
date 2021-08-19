import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import { AutocompleteInput, AutocompleteItem } from '../autocomplete';
import { BackgroundedButton } from '../styled';
import { StyleSheet, View } from 'react-native';
import { SearchMusicScreenNavigationProp } from '../../screens/SearchMusic';

const ContentContainer = styled.View`
  background-color: ${theme.colors.dark};
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
  align-items: baseline;
`;

interface SearchHeaderProps {
  value: string;
  onChangeValue: (text: string) => void;
  onSearch: (terms: string) => void;
  data: string[];
  placeholder: string;
  isLoading: boolean;
  showResults: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = props => {
  const {
    value,
    onChangeValue,
    onSearch,
    data,
    placeholder,
    isLoading,
    showResults,
  } = props;

  //Hook navigation
  const navigation = useNavigation<SearchMusicScreenNavigationProp>();

  const keyExtractor = (_: any, idx: number) => idx.toString();

  const renderItem = (item: string) => (
    <AutocompleteItem item={item} onSelectItem={onSearch} />
  );

  return (
    <View>
      <ContentContainer>
        <BackgroundedButton
          name="chevron-left"
          onPress={() => navigation.goBack()}
        />

        <AutocompleteInput
          data={data}
          hideResults={showResults}
          inputContainerStyle={styles.inputContainerStyle}
          flatListProps={{
            keyExtractor,
            renderItem: ({ item }: any) => renderItem(item),
          }}
          renderTextInput={() => (
            <SearchBar
              round
              lightTheme
              autoCorrect={false}
              showCancel={false}
              platform="ios"
              placeholder={placeholder}
              value={value}
              // @ts-ignore: the type definition is broken in the latest version
              onChangeText={onChangeValue}
              showLoading={isLoading}
              placeholderTextColor="gray"
              loadingProps={{
                color: 'gray',
              }}
              cancelButtonProps={{
                color: 'white',
                buttonTextStyle: {
                  fontSize: 14,
                },
              }}
              inputStyle={styles.inputStyle}
              containerStyle={{ backgroundColor: theme.colors.dark }}
              inputContainerStyle={{
                backgroundColor: theme.colors.darker,
              }}
            />
          )}
        />
      </ContentContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 0,
  },
  inputStyle: {
    fontSize: theme.font.headerSize,
    color: 'white',
  },
});

export default SearchHeader;
