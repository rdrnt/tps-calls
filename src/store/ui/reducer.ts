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
    case UIActions.SET_INTERACTING_MAP:
      return {
        ...state,
        isInteractingWithMap: action.payload.isInteracting,
      };
    default:
      return state;
  }
}
