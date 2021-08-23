export interface Video {
  id: string;
  original_title: string;
  title: string;
  artist: string;
  duration: number;
  publishedAt: Date | string;
  thumbnails?: Object[];
  avatar?: string; //image with max resolution
  url?: string;
  isLive?: boolean;
}

export interface SearchResult {
  videos: Video[] | [];
  didyoumean: string; // spelling proposal
  token: string; // key to get more data (next/prev page result)
  apikey: string; // api key to get more data (next/prev page result)
}

export interface Channel {
  name: string;
  channel_id: string;
  nb_videos: number;
  nb_subscriber: number;
  official: boolean;
  channel_avatar_small: string;
  channel_avatar_medium: string;
  channel_avatar_large: string;
}
