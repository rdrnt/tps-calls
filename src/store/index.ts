import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Reducer stuff
import incidentsReducer from './slices/incidents';
import uiReducer from './slices/ui';
import userReducer from './slices/user';
import camerasReducer from './slices/cameras';

export const store = configureStore({
  reducer: {
    incidents: incidentsReducer,
    ui: uiReducer,
    user: userReducer,
    cameras: camerasReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
