import ytdl from 'react-native-ytdl';
import { YoutubeVideo } from '../../model';

export const getHighestAudioLinkClass = async (
  url: string,
  options: object = { quality: 'highestaudio' },
) => {
  try {
    const result = await ytdl(url, options);
    if (!result.length) {
      return null;
    }
    return result[0].url;
  } catch (error) {
    throw error;
  }
};

const useYtdl = () => {
  /**
   * This function get the highest audio link
   * @param {*} url youtube url video
   * @param {*} options
   * @returns playable link
   */
  const getHighestAudioLink = async (
    url: string,
    options: object = { quality: 'highestaudio' },
  ) => {
    try {
      const result = await ytdl(url, options);
      if (!result.length) {
        return null;
      }
      return result[0].url;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Return video details
   * */
  const getVideoInfo = async (
    url: string,
    options: object = { quality: 'highestaudio' },
  ) => {
    try {
      const result = await ytdl.getInfo(url, options);
      if (!result) {
        return null;
      }

      const { videoId, title, lengthSeconds, thumbnails, media } =
        result.videoDetails;

      return new YoutubeVideo(
        videoId,
        title,
        media?.artist,
        lengthSeconds,
        thumbnails,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getVideoInfo,
    getHighestAudioLink,
  };
};

export default useYtdl;
