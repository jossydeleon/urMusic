import React, {useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Input} from 'react-native-elements';
import styled from 'styled-components/native';
import {PopupSheetMenu, HeaderPopup, ContentPopup} from '../components/popup';
import useYtdl from '../hooks/util/useYtdl';
import { Video } from '../model';
import {theme} from '../theme/theme';

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const Catcher = () => {
  //Hook
  const {getVideoInfo} = useYtdl();
  //State
  const [hideCatcher, setHideCatcher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('https://www.youtube.com/watch?v=fvcxGU8C8pw');
  const [videoInfo, setVideoInfo] = useState<Video>();
  //State to handle popup
  const [popup, setPopup] = useState(false);

  const options = [
    {
      title: 'Add to playlist',
      icon: 'music',
      func: () => console.log('Adding to Playlist'),
    },
    {
      title: 'Just play',
      icon: 'play',
      func: () => console.log('Just Play'),
    },
  ];

  /**
   * Close popup
   * */
  const handleClosePopup = () => {
    //Show catcher view to receive a new url
    setHideCatcher(false);
    //Reset video info state
    setVideoInfo(undefined);
    setPopup(false);
  };

  /**
   * Get information about the video link caught
   * */
  const handleGetVideoInfo = async () => {
    if (!text.length) return;
    try {
      setLoading(true);
      const info = await getVideoInfo(text);
      if (info) {
        setVideoInfo(info);
        //Hide catcher view to display video details
        setHideCatcher(true);
        setPopup(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        {!hideCatcher && (
          <View>
            <Text style={styles.h4}>Do you have the YouTube link?</Text>
            <Text style={styles.h5}>Paste it here and tap de icon.</Text>
            <Input
              onChangeText={setText}
              disabled={loading}
              inputStyle={{fontSize: theme.font.h6, color: theme.colors.gray}}
              inputContainerStyle={{borderColor: theme.colors.dark}}
              leftIcon={loading && <ActivityIndicator color={theme.colors.gray} />}
              rightIcon={{
                type: 'font-awesome-5',
                name: 'searchengin',
                color: theme.colors.gray,
                onPress: () => handleGetVideoInfo(),
              }}
            />
          </View>
        )}

        {hideCatcher && videoInfo && (
          <PopupSheetMenu
            orientation={'vertical'}
            show={popup}
            initialOffsetFromBottom={3.0}
            onClose={handleClosePopup}
            containerStyle={{backgroundColor: 'black'}}
            CustomTitleComponent={
              <HeaderPopup
                title={videoInfo.title}
                artist={videoInfo.artist}
                artwork={videoInfo.thumbnail}
              />
            }
            CustomComponent={<ContentPopup options={options} onCancel={handleClosePopup} />}
          />
        )}
      </ContentContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  h4: {
    fontSize: theme.font.h5,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  h5: {
    fontSize: theme.font.h6,
    color: 'gray',
    textAlign: 'center',
  },
});

export default Catcher;
