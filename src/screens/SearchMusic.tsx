import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme/theme';
import useGoogleAutoComplete from '../hooks/util/useGoogleAutocomplete';
import { SearchList, SearchHeader } from '../components/searcher';
import { PopupSheetMenu, HeaderPopup, ContentPopup } from '../components/popup';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import useHelpers from '../hooks/util/useHelpers';
import Clipboard from '@react-native-clipboard/clipboard';
import { LinearProgress } from 'react-native-elements';
import { OptionsProps } from '../components/popup/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Video } from '../hooks/util/react-usetube/types';
import { useTube } from '../hooks/util/react-usetube';

export type SearchMusicScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'SearchMusic'
>;

type SearchMusicProps = {
  navigation: SearchMusicScreenNavigationProp;
};

const SearchMusic: React.FC<SearchMusicProps> = ({ navigation }) => {
  //State to handle typing query
  const [query, setQuery] = useState('');
  //State to handle video selected
  const [videoSelected, setVideoSelected] = useState<
    Video | undefined | null
  >();
  //State to handle popup
  const [popup, setPopup] = useState({
    show: false,
    title: '',
  });
  const [addingTrack, setAddingTrack] = useState(false);
  //Hook Google autocomplete
  const { getAutoCompleteQueries, resetSuggestions, loading, suggestions } =
    useGoogleAutoComplete();
  //Hook Youtube search
  const { result, fetching, searchVideos, fetchMore } = useTube();
  //Hook helpers
  const { transformTitle } = useHelpers();
  //Hook Media Player
  const { addTrack } = useMediaPlayer();

  //Options available when video is selected
  const videoOptions: OptionsProps[] = [
    {
      title: 'Add to playlist',
      icon: 'music',
      func: () => handleAddToPlaylist(),
    },
    {
      title: 'Just play',
      icon: 'play',
      func: () => console.log('Just Play'),
    },
    {
      title: 'Copy link',
      icon: 'link',
      func: () => handleCopyLink(),
    },
  ];

  useEffect(() => {
    searchVideos('daddy yankee');
    return () => {
      searchVideos('');
      getAutoCompleteQueries('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect to fetch suggestions everytime user types something
   */
  useEffect(() => {
    if (!query.length) {
      return;
    }
    handleFetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /**
   * Close popup
   * */
  const handleClosePopup = () => {
    setPopup({ ...popup, show: false });
    setVideoSelected(undefined);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /**
   * Search for videos based on query
   * */
  const handleSearch = useCallback(async terms => {
    resetSuggestions();
    await searchVideos(terms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle video selected
   */
  const handleVideoSelected = useCallback(async video => {
    setVideoSelected(video);
    setPopup({ ...popup, show: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Add new song to playlist
   **/
  const handleAddToPlaylist = async () => {
    try {
      setAddingTrack(true);
      if (videoSelected) {
        await addTrack(videoSelected);
      }
      handleClosePopup();
    } catch (error) {
    } finally {
      setAddingTrack(false);
    }
  };

  /**
   * Copy url link of video selected in the
   * system clipboard
   **/
  const handleCopyLink = () => {
    Clipboard.setString(videoSelected?.url || '');
    handleClosePopup();
  };

  /**
   * Layout effect to add a custom header.
   * This effect run before mounting component
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return null;
      },
    });
  }, [navigation, query]);

  return (
    <View style={styles.container}>
      <SearchList
        data={result?.videos || []}
        onPress={handleVideoSelected}
        onMore={fetchMore}
        onRefresh={fetchMore}
        headerComponent={
          <SearchHeader
            value={query}
            isLoading={loading}
            showResults={query.length > 0}
            placeholder={'Search music'}
            data={suggestions}
            onChangeValue={handleTextEntry}
            onSearch={handleSearch}
          />
        }
      />

      <PopupSheetMenu
        orientation={'vertical'}
        show={popup.show}
        initialOffsetFromBottom={3.0}
        onClose={handleClosePopup}
        containerStyle={styles.popupContainer}
        title={popup?.title}
        showCancel={true}
        cancelLabel={'Close'}
        CustomTitleComponent={
          <HeaderPopup
            title={transformTitle(videoSelected?.title || '', 40)}
            artist={transformTitle(videoSelected?.artist || '', 25)}
            artwork={videoSelected?.avatar}
            isLoading={addingTrack}
          />
        }
        CustomComponent={
          <ContentPopup options={videoOptions} onCancel={handleClosePopup} />
        }
      />

      {fetching && <LinearProgress color={theme.colors.primary} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  popupContainer: {
    backgroundColor: 'black',
  },
});

export default SearchMusic;
