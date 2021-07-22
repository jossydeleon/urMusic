import {useCallback, useEffect, useState} from 'react';
import {searchVideo} from './react-usetube';
import Video from './react-usetube/types/video';

const MAX_NUM_OF_ATTEMPS_ALLOW = 5;

const useTube = () => {
  //Local state
  const [attemps, setAttemps] = useState(0);
  const [terms, setTerms] = useState('');
  const [fetching, setFetching] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState();
  const [nextPageProps, setNextPageProps] = useState({
    token: '',
    apikey: '',
  });

  /**
   * Somethings the first request to the API does not work out of stock.
   * This is a work-around to do at least 3 attemps.
   * */
  useEffect(() => {
    if (attemps > 0 && attemps <= MAX_NUM_OF_ATTEMPS_ALLOW) {
      console.log(`Attempting: ${attemps} of ${MAX_NUM_OF_ATTEMPS_ALLOW} allowed`);
      searchVideos(terms);
    }
  }, [attemps]);

  /**
   * Search for videos based on terms
   * */
  const searchVideos = async (search: string): Promise<void> => {
    if (!search) return;

    try {
      setError(undefined);
      setTerms(search);
      setFetching(true);

      const {videos, token, apikey} = await searchVideo(search);

      //Work-around: read useEffect description
      if (!videos.length) {
        setAttemps(attemps + 1);
        return;
      }

      //Reset num of attemptings
      setAttemps(0);
      //Save search terms in state in case user request more videos
      setTerms(search);
      //Save token in case user to request more videos
      setNextPageProps({token, apikey});
      //Save videos in state
      setVideos([...videos]);
    } catch (error) {
      setError(error);
      console.log('Searching videos: ' + error);
    } finally {
      setFetching(false);
    }
  };

  /**
   * Search more videos based on the initial terms
   * */
  const searchMoreVideos = async (): Promise<void> => {
    if (!terms || !nextPageProps.token || !nextPageProps.apikey) return;

    try {
      setError(undefined);
      setFetching(true);
      const result = await searchVideo(terms, nextPageProps.token, nextPageProps.apikey);

      if (!result) return;

      setVideos([...videos, ...result.videos]);
      setNextPageProps({token: result.token, apikey: result.apikey});
    } catch (error) {
      setError(error);
      console.log('Searching more videos: ' + error);
    } finally {
      setFetching(false);
    }
  };

  /**
   * Function to get more videos
   * */
  const fetchMore = useCallback(() => searchMoreVideos(), [nextPageProps]);

  //Functions and objects to return
  return {fetching, videos, error, nextPageProps, searchVideos, fetchMore};
};

export default useTube;
