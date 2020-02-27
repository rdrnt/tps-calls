import { INITIAL_STATE, UserActions, UserActionType, UserState } from '.';

export function userReducer(
  state = INITIAL_STATE,
  action: UserActionType
): UserState {
  switch (action.type) {
    case UserActions.SET_LOCATION_AVAILABLE:
      return {
        ...state,
        location: {
          ...state.location,
          available: action.payload.value,
        },
      };
    case UserActions.SET_LOCATION_COORDINATES:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: action.payload.coordinates,
        },
      };
    case UserActions.SET_REQUESTING_LOCATION_PERMISSIONS:
      return {
        ...state,
        location: {
          ...state.location,
          requesting: action.payload.value,
        },
      };
    default:
      return state;
  }
}
