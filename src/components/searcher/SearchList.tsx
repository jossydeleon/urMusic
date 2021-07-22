import React, {useCallback, ReactElement} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {SearchVideoResult} from '../../model';
import SearchItem from './SearchItem';

interface Props {
  data: SearchVideoResult[];
  onRefresh: () => void;
  onMore: () => void;
  onPress: (video: SearchVideoResult) => void;
  headerComponent: ReactElement;
}

const SearchList: React.FC<Props> = ({
  data,
  onRefresh,
  onMore,
  onPress,
  headerComponent,
}) => {
  /**
   * */
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  /**
   * */
  const renderItem = useCallback(
    ({item}) => <SearchItem video={item} onPress={onPress} />,
    [],
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.9}
      onEndReached={onMore}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={headerComponent}
      refreshControl={
        <RefreshControl
          //refresh control used for the pull to refresh
          refreshing={false}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default SearchList;
