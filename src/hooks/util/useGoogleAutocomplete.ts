import React from 'react';
import axios from 'axios';

const GOOGLE_AUTOCOMPLETE_URL = 'https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

const useGoogleAutoComplete = () => {
  const [loading, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [error, setError] = React.useState(null);

  /**
   * Reset array of suggestions
   * */
  const resetSuggestions = () => {
    setSuggestions([]);
  };

  /**
   * This function returns an array
   * with suggestions base on query
   * @param {*} query
   * @returns
   */
  const getAutoCompleteQueries = async (query: string): Promise<void> => {
    setError(null);

    if (!query) {
      resetSuggestions();
      return;
    }

    try {
      setLoading(true);
      const result = await axios.get(GOOGLE_AUTOCOMPLETE_URL + query);
      // Check if status was OK
      if (result.status !== 200) return;
      // Check if result array length is greater than 1.
      // This is because the suggestions will be on the position #1
      if (result.data.length < 1) return;
      // Return array with suggestions
      setSuggestions(result.data[1]);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [
    getAutoCompleteQueries, 
    resetSuggestions, 
    loading, 
    suggestions, 
    error
  ];
};

export default useGoogleAutoComplete;
