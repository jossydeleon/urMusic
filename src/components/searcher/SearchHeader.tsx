import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import { AutocompleteInput, AutocompleteItem } from '../autocomplete';
import { BackButton } from '../BackButton';
import { StyleSheet, View } from 'react-native';
import { SearchMusicScreenNavigationProp } from '../../screens/SearchMusic';
import useGoogleAutoComplete from '../../hooks/util/useGoogleAutocomplete';

const ContentContainer = styled.View`
  background-color: ${theme.colors.dark};
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
  align-items: baseline;
`;

interface SearchHeaderProps {
  onSearch: (terms: string) => void;
  placeholder: string;
  showLoading?: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = props => {
  const {
    onSearch,
    placeholder,
    showLoading,
  } = props;

  //Hook navigation
  const navigation = useNavigation<SearchMusicScreenNavigationProp>();

  //Hook Google autocomplete
  const { getAutoCompleteQueries, resetSuggestions, loading, suggestions } =
    useGoogleAutoComplete();

  //State to handle typing query
  const [query, setQuery] = useState('');


  useEffect(() => {
    return () => {
      getAutoCompleteQueries('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
  * Effect to fetch suggestions everytime user types something
  */
  useEffect(() => {
    if (query.length) {
      handleFetchSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /**
   * Handle text entry in searchbar
   **/
  const handleTextEntry = useCallback(
    text => {
      setQuery(text);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  /**
   * Fetch suggestions based on query
   * @returns
   */
  const handleFetchSuggestions = useCallback(async () => {
    await getAutoCompleteQueries(query);
  }, [query, getAutoCompleteQueries]);

  /**
   * Key extractor of each item in list
   * */
  const keyExtractor = (_: any, idx: number) => idx.toString();


  /**
   * Ui to render in list
   * */
  const renderItem = (item: string) => (
    <AutocompleteItem item={item} onSelectItem={() => {
      Keyboard.dismiss();
      resetSuggestions();
      onSearch(query);
      setQuery('');
    }} />
  );

  return (
    <View>
      <ContentContainer>
        <BackButton
          name="chevron-left"
          onPress={() => navigation.pop()}
        />

        <AutocompleteInput
          data={suggestions}
          hideResults={!query.length || !suggestions.length}
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
              value={query}
              // @ts-ignore: the type definition is broken in the latest version
              onChangeText={handleTextEntry}
              showLoading={showLoading ? loading : false}
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
