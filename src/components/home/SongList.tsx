import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { ISong } from '../../types';
import SongViewer from './SongViewer';

export interface SongListProps {
    songs: ISong[],
}

const SongList: React.FC<SongListProps> = ({ songs }) => {

    const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);

    const renderItem = useCallback(
        ({ item }) => <SongViewer song={item} />,
        [],
    );

    return (
        <FlatList
            data={songs}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
        />
    );
};

export default SongList;
