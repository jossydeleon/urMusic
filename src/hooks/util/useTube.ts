import { useCallback, useEffect, useState } from 'react';
import { searchVideo } from './react-usetube';
import { SearchResult } from './react-usetube/types';

const MAX_NUM_OF_ATTEMPS_ALLOW = 5;

const useTube = () => {
  //Local state
  const [attemps, setAttemps] = useState(0);
  const [terms, setTerms] = useState('');
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState<SearchResult | undefined>();
  const [error, setError] = useState();
  const [nextPageProps, setNextPageProps] = useState({
    token: '',
    apikey: '',
  });

  /**
   * Somethings the first request to the API does not work out of pocket.
   * This is a work-around to do at least N attemps.
   * */
  useEffect(() => {
    if (attemps > 0 && attemps <= MAX_NUM_OF_ATTEMPS_ALLOW) {
      console.log(
        `Attempting: ${attemps} of ${MAX_NUM_OF_ATTEMPS_ALLOW} allowed`,
      );
      searchVideos(terms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemps]);

  /**
   * Search for videos based on terms
   * */
  const searchVideos = async (search: string): Promise<void> => {
    if (!search) {
      return;
    }

    try {
      setError(undefined);
      setTerms(search);
      setFetching(true);

      const response = await searchVideo(search);

      //Work-around: read useEffect description
      if (!response?.videos.length) {
        setAttemps(attemps + 1);
        return;
      }

      //Reset num of attemptings
      setAttemps(0);
      //Save search terms in state in case user request more videos
      setTerms(search);
      //Save token in case user to request more videos
      setNextPageProps({ token: response.token, apikey: response.apikey });
      //Save videos in state
      setResult(response);
    } catch (err) {
      setError(err);
      console.log('Searching videos: ' + err);
    } finally {
      setFetching(false);
    }
  };

  /**
   * Search more videos based on the initial terms
   * */
  const searchMoreVideos = async (): Promise<void> => {
    if (!terms || !nextPageProps.token || !nextPageProps.apikey) {
      return;
    }

    try {
      setError(undefined);
      setFetching(true);
      const response = await searchVideo(
        terms,
        nextPageProps.token,
        nextPageProps.apikey,
      );

      if (!result) {
        return;
      }

      setResult({ ...result, ...response });
      setNextPageProps({ token: result.token, apikey: result.apikey });
    } catch (err) {
      setError(err);
      console.log('Searching more videos: ' + err);
    } finally {
      setFetching(false);
    }
  };

  /**
   * Function to get more videos
   * */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMore = useCallback(() => searchMoreVideos(), [nextPageProps]);

  //Functions and objects to return
  return { fetching, result, error, nextPageProps, searchVideos, fetchMore };
};

export default useTube;
