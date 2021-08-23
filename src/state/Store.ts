import { createStore, applyMiddleware } from 'redux';
import RootReducers from './reducers/RootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const Store = createStore(
  RootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootStore = ReturnType<typeof RootReducers>;

export default Store;
