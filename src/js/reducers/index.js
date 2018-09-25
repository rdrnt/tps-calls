import { combineReducers } from 'redux';

import UI from './ui';
import policeApi from './policeApi';

const rootReducer = combineReducers({
  UI,
  policeApi,
});

export default rootReducer;
