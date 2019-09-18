import { INITIAL_STATE, UIActions, UIActionType, UIState } from '.';

export function uiReducer(
  state = INITIAL_STATE,
  action: UIActionType
): UIState {
  switch (action.type) {
    case UIActions.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: action.payload.value,
      };
    case UIActions.OPEN_LOADER:
      return {
        ...state,
        loader: {
          open: true,
          message: action.payload.message,
        },
      };
    case UIActions.CLOSE_LOADER:
      return {
        ...state,
        loader: {
          open: false,
          message: undefined,
        },
      };
    default:
      return state;
  }
}
