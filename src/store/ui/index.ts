/*
 UI
*/
export interface UIState {
  drawerOpen: boolean;
}

export const INITIAL_STATE: UIState = {
  drawerOpen: false,
};

export enum UIActions {
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
}

export interface ToggleDrawerAction {
  type: UIActions;
  payload: {
    value: boolean;
  };
}

export type UIActionType = ToggleDrawerAction;
