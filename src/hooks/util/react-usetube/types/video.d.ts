export default interface Video {
  id:                    string,
  original_title:        string,
  title:                 string,
  artist:                string,
  duration:              number,
  publishedAt:           Date,
  thumbnails?:            Object[],
  avatar?:                string, //image with max resolution
  url?:                   string,
  isLive?:                boolean
}
