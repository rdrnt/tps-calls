/*
 UI
*/
export interface UIState {
  drawerOpen: boolean;
  isInteractingWithMap: boolean;
}

export const INITIAL_STATE: UIState = {
  drawerOpen: false,
  isInteractingWithMap: false,
};

export enum UIActions {
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
  SET_INTERACTING_MAP = 'SET_MAP_INTERACTION',
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

export type UIActionType = ToggleDrawerAction | SetInteractingMapAction;
