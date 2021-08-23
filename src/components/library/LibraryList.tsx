import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Song } from '../../model';
import LibraryItem from './LibraryItem';

interface Props {
  data: Song[];
  loading?: boolean;
}

const LibraryList: React.FC<Props> = ({ data }) => {
  /**
   * */
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  /**
   * */
  const renderItem = useCallback(
    ({ item, index }) => (
      <LibraryItem position={index} song={item} />
    ),
    [],
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

export default LibraryList;
