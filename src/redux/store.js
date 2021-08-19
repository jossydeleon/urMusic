import { applyMiddleware, createStore, compose } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  allReducers,
  compose(applyMiddleware(thunk), composeEnhancer),
);

export default store;
