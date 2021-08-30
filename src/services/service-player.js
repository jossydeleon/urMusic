import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    try {
      await TrackPlayer.play();
    } catch (err) {}
  });

  TrackPlayer.addEventListener('remote-pause', async () => {
    try {
      await TrackPlayer.pause();
    } catch (err) {}
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (err) {}
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (err) {}
  });

  TrackPlayer.addEventListener('remote-stop', async () => {
    try {
      await TrackPlayer.destroy();
    } catch (err) {}
  });
};
