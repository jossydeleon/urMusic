import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    try {
      TrackPlayer.skipToNext();
    } catch (err) {
      console.error('Error from service-player: ', err);
    }
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    try {
      TrackPlayer.skipToPrevious();
    } catch (err) {
      console.error('Error from service-player: ', err);
    }
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });

  return () => {
    console.log('Unmonting services...');
  };
};
