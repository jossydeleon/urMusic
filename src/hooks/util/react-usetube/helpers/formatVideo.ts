import getVideoDate from '../getVideoDate'
import getDateFromText from './getDateFromText'
import findVal from './findVal'
import getImageUrl from './getImageUrl'
import Video from '../types/video'

const YOUTUBE_URL = 'https://youtube.com/watch?v='

export default async function formatVideo(video: any, speedDate: boolean = false) {
  try{

    // Looking for video info
    if(video.compactVideoRenderer || video.gridVideoRenderer || video.videoRenderer || video.playlistVideoRenderer ) {
      if(video.compactVideoRenderer) {
        video = video.compactVideoRenderer
      }
      else if(video.gridVideoRenderer) {
        video = video.gridVideoRenderer
      }
      else if(video.playlistVideoRenderer ) {
        video = video.playlistVideoRenderer
      }
      else if(video.videoRenderer ) {
        video = video.videoRenderer
      }
      let id: string = video.videoId
      let durationDatas: any = 0

      // Get title
      if(video.title.simpleText) {
        video.title = video.title.simpleText
      }
      else if(video.title.runs[0].text) {
        video.title = video.title.runs[0].text
      }
      else {
        video.title = ''
      }

      // Title formating
      video.original_title = video.title

      if(video.title.split('-').length === 1) {
        video.artist = ''
      }
      else {
        let splited = video.original_title.match(/([^,]*)-(.*)/)
        video.artist = splited[1]
        video.title = splited[2]
      }

      //Thumbnails
      let thumbnails = [];
      if(video?.thumbnail && video.thumbnail?.thumbnails?.length) {
        thumbnails = video.thumbnail.thumbnails; 
      }

      // If not picture found, function getImageUrl will generate images based on id
      // Some images could not work
      else {
        thumbnails = getImageUrl(id)
      }

      // Max thumbnail quality
      let avatar;
      if(thumbnails.length) {
        avatar = thumbnails[thumbnails.length - 1].url;
      }

      // Duration formating
      if(video.lengthText) {
        if(video.lengthText.hasOwnProperty("simpleText")) { //For more videos
          durationDatas = video.lengthText.simpleText
        }
        else {
          durationDatas = findVal(video.lengthText, 'text')//For initial videos
        }
        if(durationDatas) {
          durationDatas = durationDatas.split(':')
        }
      }
      else if(video.thumbnailOverlays) {
        durationDatas = findVal(video, 'lengthText')
        if(durationDatas) {
          durationDatas = durationDatas.split(':')
        }
      }     

      let hour: number = 0
      let minute: number = 0
      let second: number = 0
      let duration: number = 0;
      let isLive: boolean = false;
  
      if(Array.isArray(durationDatas)) {
        switch(durationDatas.length) {
          case 3:
            hour = parseInt(durationDatas[0]) * 60 * 60
            minute = parseInt(durationDatas[1]) * 60
            second = parseInt(durationDatas[2])
            break
          case 2:
            minute = parseInt(durationDatas[0]) * 60
            second = parseInt(durationDatas[1])
            break
          case 1:
            second = parseInt(durationDatas[0])
            break
        }

        duration = hour+minute+second;
      }
      else {
        isLive = true;
      }

      // Date formating
      let publishedAt: Date = new Date(Date.now())
      if(speedDate && video.publishedTimeText) {
        if(video.publishedTimeText.hasOwnProperty('simpleText')) {
          publishedAt = getDateFromText(video.publishedTimeText.simpleText)
        }
        else if(video.publishedTimeText.hasOwnProperty('runs')) {
          publishedAt = getDateFromText(video.publishedTimeText.runs[0].text)
        }
      }
      else {
        publishedAt = await getVideoDate(id)
      }

      let finalVideo:Video = {
        id,
        original_title: video.original_title.trim(),
        title:  video.title.trim(),
        artist: video.artist.trim() || 'YouTube',
        thumbnails,
        avatar,
        duration: duration,
        publishedAt: publishedAt,
        url: YOUTUBE_URL + id,
        isLive
      }

      return finalVideo;
    }
    else if(video.didYouMeanRenderer || video.showingResultsForRenderer) {
      video = video.didYouMeanRenderer ? video.didYouMeanRenderer : video.showingResultsForRenderer
      return {
        id:  'didyoumean',
        original_title: '',
        title:  video.correctedQuery.runs[0].text,
        artist: '',
        thumbnails: getImageUrl('didyoumean'),
        avatar:'',
        duration: 0,
        publishedAt: new Date(Date.now()),
        url:''
      }
    }
  } catch(e) {
    console.error('format video failed')
  }
}

