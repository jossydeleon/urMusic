export interface SearchVideoResult {
  id: string;
  original_title: string;
  title: string;
  artist: string;
  duration: number;
  publishedAt: Date;
  thumbnails?: Object[];
  avatar: string;
  url: string;
  isLive?: boolean;
}
