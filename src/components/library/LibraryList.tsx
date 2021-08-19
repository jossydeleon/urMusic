import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Song } from '../../model';
import { ISong } from '../../types';
import LibraryItem from './LibraryItem';

interface Props {
  data: Song[];
  loading?: boolean;
  onPlay: (song: ISong) => void;
  onDelete: (song: ISong) => void;
}

const LibraryList: React.FC<Props> = ({ data, onPlay, onDelete }) => {
  /**
   * */
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  /**
   * */
  const renderItem = useCallback(
    ({ item }) => (
      <LibraryItem song={item} onPlay={onPlay} onDelete={onDelete} />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
