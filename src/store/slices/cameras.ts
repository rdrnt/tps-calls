import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalTorontoTrafficCamera } from '../../types';

export interface CameraState {
  list: LocalTorontoTrafficCamera[];
}

const initialState: CameraState = {
  list: [],
};

const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {
    setCameraList: (
      state,
      action: PayloadAction<LocalTorontoTrafficCamera[]>
    ) => {
      state.list = action.payload;
    },
  },
});

export const { setCameraList } = camerasSlice.actions;

export default camerasSlice.reducer;
