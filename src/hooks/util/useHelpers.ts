import moment from 'moment';

const useHelpers = () => {
  /**
   * 1. Converts string to lower case
   * 2. Remove double quotes from string
   * 3. Capitalize first letter of string
   **/
  const capitalize = (title: string): string => {
    if (!title) {
      return '';
    }
    const [firstLetter, ...restOfWord] = title
      .toLowerCase()
      .split('"')
      .join('');
    return firstLetter.toUpperCase() + restOfWord.join('');
  };

  /**
   * Truncate string to desire number of characters
   **/
  const truncate = (string: string, n: number): string => {
    if (!string) {
      return '';
    }
    return string.length > n ? string.substring(0, n - 1) + '...' : string;
  };

  /**
   * Transform title with first letter as a capital letter and truncate the string with the n value
   **/
  const transformTitle = (string: string, n: number): string =>
    truncate.call(this, capitalize(string), n);

  /**
   * Format seconds in timer format hh:mm:ss
   * */
  const secondsToTimerFormat = (seconds: string) => {
    if (!seconds) {
      return '0:00';
    }
    // eslint-disable-next-line radix
    const parse = parseInt(seconds);
    return new Date(parse * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, '');
  };

  /**
   * Return date in format called timeago or relative time.
   * */
  const formatDateToTimeAgo = (date: Date | string) => {
    if (!date) {
      return moment(new Date()).fromNow();
    } else if (typeof date === 'string') {
      return moment(new Date(date)).fromNow();
    } else {
      return moment(date).fromNow();
    }
  };

  return {
    capitalize,
    truncate,
    transformTitle,
    secondsToTimerFormat,
    formatDateToTimeAgo,
  };
};

export default useHelpers;
