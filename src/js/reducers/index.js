import { combineReducers } from 'redux';

import UI from './ui';
import incidents from './incidents';

const rootReducer = combineReducers({
  UI,
  incidents,
});

export default rootReducer;
