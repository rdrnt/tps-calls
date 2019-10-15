import { Coordinates } from '@rdrnt/tps-calls-shared';

/*
 User
*/

export interface UserLocationState {
  available: boolean;
  coordinates?: Coordinates;
}

export interface UserState {
  location: UserLocationState;
}

export const INITIAL_STATE: UserState = {
  location: {
    available: false,
  },
};

export enum UserActions {
  SET_LOCATION_AVAILABLE = 'SET_LOCATION_AVAILABLE',
  SET_LOCATION_COORDINATES = 'SET_LOCATION_COORDINATES',
}

export interface SetLocationAvailableAction {
  type: UserActions.SET_LOCATION_AVAILABLE;
  payload: {
    value: boolean;
  };
}

export interface SetLocationCoordinatesAction {
  type: UserActions.SET_LOCATION_COORDINATES;
  payload: {
    coordinates?: Coordinates;
  };
}

export type UserActionType =
  | SetLocationAvailableAction
  | SetLocationCoordinatesAction;
