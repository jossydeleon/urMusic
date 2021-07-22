import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../theme/theme';
import useGoogleAutoComplete from '../hooks/util/useGoogleAutocomplete';
import {SearchList, SearchHeader} from '../components/searcher';
import {PopupSheetMenu, HeaderPopup, ContentPopup} from '../components/popup';
import useMediaPlayer from '../hooks/player/useMediaPlayer';
import useHelpers from '../hooks/util/useHelpers';
import Clipboard from '@react-native-clipboard/clipboard';
import useTube from '../hooks/util/useTube';
import { LinearProgress } from 'react-native-elements';

const SearchMusic = ({navigation}) => {
  //State to handle typing query
  const [query, setQuery] = useState('');
  //State to handle video selected
  const [videoSelected, setVideoSelected] = useState();
  //State to handle popup
  const [popup, setPopup] = useState({
    show: false,
    title: '',
  });
  const [addingTrack, setAddingTrack] = useState(false);
  //Hook Google autocomplete
  const [getAutoCompleteQueries, resetSuggestions, loading, suggestions] =
    useGoogleAutoComplete();
  //Hook Youtube
  const {videos, fetching, searchVideos, fetchMore} = useTube();
  //Hook helpers
  const {transformTitle} = useHelpers();
  //Hook Media Player
  const {addTrack} = useMediaPlayer();

  //Options available when video is selected
  const videoOptions = [
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
    searchVideos("daddy yankee")
    return () => {
      searchVideos('');
      getAutoCompleteQueries('');
    }
  }, [])

  /**
   * Effect to fetch suggestions everytime user types something
   */
  useEffect(() => {
    if (!query.length) return;
    handleFetchSuggestions();
  }, [query]);

  /**
   * Close popup
   * */
  const handleClosePopup = () => {
    setVideoSelected(null);
    setPopup({show: false});
  };

  /**
   * Handle text entry in searchbar
   **/
  const handleTextEntry = useCallback(
    text => {
      setQuery(text);
    },
    [query],
  );

  /**
   * Fetch suggestions based on query
   * @returns
   */
  const handleFetchSuggestions = useCallback(async () => {
    await getAutoCompleteQueries(query);
  }, [query]);

  /**
   * Search for videos based on query
   * */
  const handleSearch = useCallback(async terms => {
    resetSuggestions();
    await searchVideos(terms);
  }, []);

  /**
   * Handle video selected
   */
  const handleVideoSelected = useCallback(async video => {
    setVideoSelected(video);
    setPopup({show: true});
  }, []);

  /**
   * Add new song to playlist
   **/
  const handleAddToPlaylist = async () => {
    try {
      setAddingTrack(true)
      await addTrack(videoSelected);
      handleClosePopup();
    } catch (error) {}
    finally {
      setAddingTrack(false)
    }
  };

  /**
   * Copy url link of video selected in the
   * system clipboard
   **/
  const handleCopyLink = () => {
    Clipboard.setString(videoSelected.url);
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
        data={videos}
        onPress={handleVideoSelected}
        onMore={fetchMore}
        onRefresh={fetchMore}
        headerComponent={
          <SearchHeader
            value={query}
            loading={loading}
            showResults={!query.length > 0}
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
        containerStyle={{backgroundColor: 'black'}}
        title={popup?.title}
        showCancel={true}
        cancelLabel={'Close'}
        CustomTitleComponent={
          videoSelected && (
            <HeaderPopup
              title={transformTitle(videoSelected?.title, 40)}
              artist={transformTitle(videoSelected?.artist, 25)}
              artwork={videoSelected?.avatar}
              isLoading={addingTrack}
            />
          )
        }
        CustomComponent={
          videoSelected && (
            <ContentPopup options={videoOptions} onCancel={handleClosePopup} />
          )
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
});

export default SearchMusic;
