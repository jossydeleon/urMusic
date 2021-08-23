import { ADD_TO_LIBRARY } from '../src/redux/actions/types';
import playerReducer from '../src/redux/reducers/playerReducer';

describe('Add new song', () => {
  test('returns new state', () => {
    const state = {
      isPlaying: true,
      volume: 2,
      currentSongYoutubeUrl: 'https://link.com',
      currentSongPlaying: {
        id: '1111',
        title: 'Con Calma',
        artist: 'Youtube',
      },
      library: [
        {
          id: '1111',
          title: 'Con Calma',
          artist: 'Youtube',
        },
      ],
    };

    const action = {
      type: ADD_TO_LIBRARY,
      payload: {
        id: '22222',
        title: 'New Song',
        artist: 'Daddy Yankee',
      },
    };

    const newState = playerReducer(action, state);

    expect(newState).toHaveLength(2);
  });
});
