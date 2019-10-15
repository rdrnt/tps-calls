import { UserActions, UserActionType } from '.';
import { Coordinates } from '@rdrnt/tps-calls-shared';

// TypeScript infers that this function is returning SendMessageAction
export function setLocationAvailable(value: boolean): UserActionType {
  return {
    type: UserActions.SET_LOCATION_AVAILABLE,
    payload: {
      value,
    },
  };
}

export function setLocationCoordinates(
  coordinates?: Coordinates
): UserActionType {
  return {
    type: UserActions.SET_LOCATION_COORDINATES,
    payload: {
      coordinates,
    },
  };
}
