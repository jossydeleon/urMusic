/* eslint-disable no-labels */
import cleanTitle from './helpers/cleanTitle';
import getVideoDesc from './getVideoDesc';
import getVideoDate from './getVideoDate';
import searchVideo from './searchVideo';
import { SearchResult, Video } from './types';

export default async function getVideosFromDesc(yt_id: string) {
  try {
    let videos: Video[] = [];
    let desc: any = await getVideoDesc(yt_id);
    if (desc) {
      loop1: for (let i = 0; i < desc.length; i++) {
        let content = desc[i].text;
        if (content.includes('-') && content.length < 100) {
          let elt = cleanTitle(content);
          let title = elt.split('-')[1].trim();
          let artist = elt.split('-')[0].trim();
          let videosSearched: SearchResult = await searchVideo(
            title + ' ' + artist,
          );
          loop2: for (let y = 0; y < videosSearched.videos.length; y++) {
            let track = videosSearched.videos[y];
            let original_title_lower = track.original_title.toLowerCase();
            if (
              original_title_lower.includes(
                artist.split(' ')[0].toLowerCase(),
              ) &&
              original_title_lower.includes(title.split(' ')[0].toLowerCase())
            ) {
              track.publishedAt = (await getVideoDate(track.id)) || new Date();
              videos.push(track);
              break loop2;
            } else {
              continue loop2;
            }
          }
        }
      }
    }
    return videos;
  } catch (e) {
    console.log('getVideosFromDesc error, maybe captcha to resolve');
    // console.log(e)
  }
}
