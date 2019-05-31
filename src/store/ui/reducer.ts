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
    default:
      return state;
  }
}
