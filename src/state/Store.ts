import { createStore, applyMiddleware } from 'redux';
import RootReducers from './reducers/RootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isPlaying'],
};

const persistedReducer = persistReducer(persistConfig, RootReducers);

const Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootStore = ReturnType<typeof RootReducers>;

export const persistor = persistStore(Store);

export default Store;
