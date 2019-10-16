import { Loader } from '../../components/Loader';
import { ModalTypes } from '../../components/Modal';

/*
 UI
*/
export interface UIState {
  drawerOpen: boolean;
  loader: Loader;
  modal: {
    open: boolean;
    type?: ModalTypes;
  };
}

export const INITIAL_STATE: UIState = {
  drawerOpen: false,
  loader: {
    open: false,
    message: undefined,
  },
  modal: {
    open: false,
  },
};

export enum UIActions {
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
  OPEN_LOADER = 'OPEN_LOADER',
  CLOSE_LOADER = 'CLOSE_LOADER',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export interface ToggleDrawerAction {
  type: UIActions.TOGGLE_DRAWER;
  payload: {
    value: boolean;
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

export interface OpenModalAction {
  type: UIActions.OPEN_MODAL;
  payload: {
    type: ModalTypes;
  };
}

export interface CloseModalAction {
  type: UIActions.CLOSE_MODAL;
  payload: {};
}

export type UIActionType =
  | ToggleDrawerAction
  | OpenLoaderAction
  | CloseLoaderAction
  | OpenModalAction
  | CloseModalAction;
