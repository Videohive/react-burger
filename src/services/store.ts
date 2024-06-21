import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';
import {
  thunk
} from 'redux-thunk';
import {
  rootReducer
} from './reducers/rootReducer';

const composeEnhancers =
    // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
