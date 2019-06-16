import { Loader } from '../../components/Loader';

/*
 UI
*/
export interface UIState {
  drawerOpen: boolean;
  isInteractingWithMap: boolean;
  loader: Loader;
}

export const INITIAL_STATE: UIState = {
  drawerOpen: false,
  isInteractingWithMap: false,
  loader: {
    open: false,
    message: undefined,
  },
};

export enum UIActions {
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
  SET_INTERACTING_MAP = 'SET_MAP_INTERACTION',
  OPEN_LOADER = 'OPEN_LOADER',
  CLOSE_LOADER = 'CLOSE_LOADER',
}

export interface ToggleDrawerAction {
  type: UIActions.TOGGLE_DRAWER;
  payload: {
    value: boolean;
  };
}

export interface SetInteractingMapAction {
  type: UIActions.SET_INTERACTING_MAP;
  payload: {
    isInteracting: boolean;
  };
}

export interface OpenLoaderAction {
  type: UIActions.OPEN_LOADER;
  payload: {
    message?: string;
  };
}

export interface CloseLoaderAction {
  type: UIActions.CLOSE_LOADER;
  payload: {};
}

export type UIActionType =
  | ToggleDrawerAction
  | SetInteractingMapAction
  | OpenLoaderAction
  | CloseLoaderAction;
