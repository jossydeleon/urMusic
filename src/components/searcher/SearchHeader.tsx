import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import styled from 'styled-components/native';
import {theme} from '../../theme/theme';
import {AutocompleteInput, AutocompleteItem} from '../autocomplete';
import {BackgroundedButton} from '../styled';
import {View} from 'react-native';

const ContentContainer = styled.View`
  background-color: ${theme.colors.dark};
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
  align-items: baseline;
`;

interface Props {
  value: string;
  onChangeValue: (text: string) => void;
  onSearch: () => void;
  data: string[];
  placeholder: string;
  loading: boolean;
  showResults: boolean;
}

const SearchHeader: React.FC<Props> = props => {
  const {
    value,
    onChangeValue,
    onSearch,
    data,
    placeholder,
    loading,
    showResults,
  } = props;

  //Hook navigation
  const navigation = useNavigation();

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
          inputContainerStyle={{borderWidth: 0}}
          flatListProps={{
            keyExtractor,
            renderItem: ({item}: any) => renderItem(item),
          }}
          renderTextInput={() => (
            <SearchBar
              round
              lightTheme
              autoCorrect={false}
              showCancel={false}
              platform={'ios'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeValue}
              showLoading={loading}
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
              inputStyle={{
                fontSize: theme.font.headerSize,
                color: 'white',
              }}
              containerStyle={{backgroundColor: theme.colors.dark}}
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

export default SearchHeader;
