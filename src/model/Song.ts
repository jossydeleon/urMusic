import { getHighestAudioLinkClass } from '../hooks/util/useYtdl';
import { ISong } from '../types';

class Song implements ISong {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration?: number;
  url: string;

  constructor(
    id: string,
    title: string,
    artist: string,
    artwork: string,
    duration: number,
    url: string,
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.artwork = artwork;
    this.duration = duration;
    this.url = url;
  }

  static getPlayableUrl = async (id: string) => {
    const playableUrl = await getHighestAudioLinkClass(
      'https://youtube.com/watch?v=' + id,
    );
    if (!playableUrl) {
      return undefined;
    }
    return playableUrl;
  };
}

export default Song;
