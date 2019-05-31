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
