import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './reducers';

// Store setup
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(rootReducer, {}, composeWithDevTools(middleware));

export default store;
