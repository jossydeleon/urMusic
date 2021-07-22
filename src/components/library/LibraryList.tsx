import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import { Song } from '../../model';
import LibraryItem from './LibraryItem';

interface Props {
  data:Song[];
  loading?:boolean
  onPlay: () => void
  onDelete: () => void
}

const LibraryList: React.FC<Props> = ({data, loading, onPlay, onDelete}) => {
  /**
   * */
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  /**
   * */
  const renderItem = useCallback(
    ({item}) => <LibraryItem song={item} onPlay={onPlay} onDelete={onDelete} />,
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
