import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocalTorontoTrafficCamera } from '../../types';

export interface CameraState {
  /** Cameras fetched so far; null means the camera no longer exists. */
  byId: Record<string, LocalTorontoTrafficCamera | null>;
  /** Ids each in-flight request is fetching, so a camera is only requested once. */
  pending: Record<string, string[]>;
}

const initialState: CameraState = {
  byId: {},
  pending: {},
};

type WithCameras = { cameras: CameraState };

const missingIds = (state: CameraState, ids: string[]) => {
  const inFlight = Object.values(state.pending).flat();
  return ids.filter(id => !(id in state.byId) && !inFlight.includes(id));
};

/** Fetches whichever of the given cameras aren't loaded or loading yet. */
export const fetchCameras = createAsyncThunk(
  'cameras/fetch',
  async (_ids: string[], { getState, requestId }) => {
    const ids = (getState() as WithCameras).cameras.pending[requestId] ?? [];
    const { getCamerasById } = await import('../../helpers/firebase/cameras');
    return getCamerasById(ids);
  },
  {
    condition: (ids, { getState }) =>
      missingIds((getState() as WithCameras).cameras, ids).length > 0,
  }
);

const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCameras.pending, (state, action) => {
        state.pending[action.meta.requestId] = missingIds(
          state,
          action.meta.arg
        );
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        for (const id of state.pending[requestId] ?? []) {
          state.byId[id] = null;
        }
        for (const camera of action.payload) {
          state.byId[camera.id] = camera;
        }
        delete state.pending[requestId];
      })
      // Failed ids stay unset, so opening the incident again retries them.
      .addCase(fetchCameras.rejected, (state, action) => {
        delete state.pending[action.meta.requestId];
      });
  },
});

export default camerasSlice.reducer;
