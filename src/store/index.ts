import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducer stuff
import { incidentReducer } from './incidents/reducer';

const rootReducer = combineReducers({
  incidents: incidentReducer,
});

// Store
export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
