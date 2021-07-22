class Video {
  videoId: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
  url: string;

  constructor(videoId: string, title: string, artist: string, duration: number, thumbnails: any[]) {
    this.videoId = videoId;
    this.title = title;
    this.duration = duration;

    //Set Artist
    this.artist = artist || 'YouTube';

    //Set thumbnail
    if (thumbnails.length) {
      this.thumbnail = thumbnails[thumbnails.length - 1].url;
    } else {
      this.thumbnail = 'https://www.brav.com/public/images/image-default.png?scale=canvas&width=250&quality=80';
    }

    //Set url video
    this.url = "https://youtube.com/watch?v=" + videoId;
  }
}

export default Video;
