import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import useHelpers from '../../hooks/util/useHelpers';
import { theme } from '../../theme/theme';
import { ISong } from '../../types';

export interface SongViewerProps {
    song: ISong
}

const SongViewer: React.FC<SongViewerProps> = ({ song }) => {

    const { transformTitle } = useHelpers();

    return (
        <TouchableOpacity
            style={styles.containerItem}
            onPress={() => console.log(song)}>
            <Image source={{ uri: song.artwork }}
                style={styles.thumbnail}
            />
            <Text style={styles.title}>
                {transformTitle(song.title, 15)}
            </Text>
            <Text style={styles.subtitle}>
                {transformTitle(song.artist, 15)}
            </Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        padding: 8,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginBottom: 3,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: theme.font.listPrimarySize,
        textAlign: 'left',
    },
    subtitle: {
        color: 'gray',
        fontSize: theme.font.listSecundarySize,
    },
});


export default SongViewer;
