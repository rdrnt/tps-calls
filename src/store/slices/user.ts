import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from '@rdrnt/tps-calls-shared';

export interface UserLocationState {
  available: boolean;
  requesting: boolean;
  coordinates?: Coordinates;
}

export interface UserState {
  location: UserLocationState;
}

const initialState: UserState = {
  location: {
    available: false,
    requesting: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLocationAvailable: (state, action: PayloadAction<boolean>) => {
      state.location.available = action.payload;
    },
    setLocationCoordinates: (
      state,
      action: PayloadAction<Coordinates | undefined>
    ) => {
      state.location.coordinates = action.payload;
    },
    setRequestingLocationPermissions: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.location.requesting = action.payload;
    },
  },
});

export const {
  setLocationAvailable,
  setLocationCoordinates,
  setRequestingLocationPermissions,
} = userSlice.actions;

export default userSlice.reducer;
