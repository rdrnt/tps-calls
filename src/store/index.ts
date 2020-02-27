import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducer stuff
import { incidentReducer } from './incidents/reducer';
import { uiReducer } from './ui/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  incidents: incidentReducer,
  ui: uiReducer,
  user: userReducer,
});

// Store
export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
