import { UIActions, UIActionType } from '.';

// TypeScript infers that this function is returning SendMessageAction
export function toggleDrawer(value: boolean): UIActionType {
  return {
    type: UIActions.TOGGLE_DRAWER,
    payload: {
      value,
    },
  };
}

export function setInteractingMap(isInteracting: boolean): UIActionType {
  return {
    type: UIActions.SET_INTERACTING_MAP,
    payload: {
      isInteracting,
    },
  };
}

export function openLoader(message?: string): UIActionType {
  return {
    type: UIActions.OPEN_LOADER,
    payload: {
      message,
    },
  };
}

export function closeLoader(): UIActionType {
  return {
    type: UIActions.CLOSE_LOADER,
    payload: {},
  };
}
