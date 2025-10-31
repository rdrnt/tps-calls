import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Incident } from '@rdrnt/tps-calls-shared';
import { Timestamp } from 'firebase/firestore';

import { DateHelper } from '../../helpers';
import { TorontoTrafficCamera } from '../../containers/BetaFeature';

export interface CameraState {
  list: TorontoTrafficCamera[];
  selected?: TorontoTrafficCamera;
}

const initialState: CameraState = {
  list: [],
  selected: undefined,
};

const camerasSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setCameraList: (state, action: PayloadAction<TorontoTrafficCamera[]>) => {
      state.list = action.payload;
    },
    setSelectedCamera: (
      state,
      action: PayloadAction<TorontoTrafficCamera | undefined>
    ) => {
      state.selected = action.payload;
    },
  },
});

export const { setCameraList, setSelectedCamera } = camerasSlice.actions;

export default camerasSlice.reducer;
