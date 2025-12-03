import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalTorontoTrafficCamera } from '../../types';

export interface CameraState {
  list: LocalTorontoTrafficCamera[];
  selected?: LocalTorontoTrafficCamera;
}

const initialState: CameraState = {
  list: [],
  selected: undefined,
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
    setSelectedCamera: (
      state,
      action: PayloadAction<LocalTorontoTrafficCamera | undefined>
    ) => {
      state.selected = action.payload;
    },
  },
});

export const { setCameraList, setSelectedCamera } = camerasSlice.actions;

export default camerasSlice.reducer;
