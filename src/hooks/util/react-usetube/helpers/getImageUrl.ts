const IMAGE_URL = 'https://i.ytimg.com/vi/';

export default function getImageUrl (videoId: String) {
    if(!videoId) return []

    return [
        {quality: 'default', url:   `${IMAGE_URL}${videoId}/default.jpg`},
        {quality: 'mqdefault', url: `${IMAGE_URL}${videoId}/mqdefault.jpg`},
        {quality: 'hqdefault', url: `${IMAGE_URL}${videoId}/hqdefault.jpg`},
        {quality: 'sddefault',url: `${IMAGE_URL}${videoId}/sddefault.jpg`},
        {quality: 'maxresdefault',url: `${IMAGE_URL}${videoId}/maxresdefault.jpg`},
    ]
}