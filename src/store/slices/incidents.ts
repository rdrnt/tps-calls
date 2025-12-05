import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalIncident } from '../../types';

export interface IncidentFilterState {
  search?: string;
  distance?: number; // The number of kilometers
}

export interface IncidentsState {
  list: LocalIncident[];
  selected?: LocalIncident;
  filter: IncidentFilterState;
}

const initialState: IncidentsState = {
  list: [],
  selected: undefined,
  filter: {},
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setIncidentList: (state, action: PayloadAction<LocalIncident[]>) => {
      state.list = action.payload;
    },
    setSelectedIncident: (
      state,
      action: PayloadAction<LocalIncident | undefined>
    ) => {
      state.selected = action.payload;
    },
    setIncidentFilter: (
      state,
      action: PayloadAction<{
        values: IncidentFilterState;
        merge?: boolean;
      }>
    ) => {
      const { values, merge = true } = action.payload;

      if (merge) {
        // Merge with existing filter
        state.filter = { ...state.filter, ...values };
      } else {
        // Replace filter
        state.filter = values;
      }

      // Remove keys without a value
      Object.keys(state.filter).forEach(key => {
        if (!state.filter[key as keyof IncidentFilterState]) {
          delete state.filter[key as keyof IncidentFilterState];
        }
      });
    },
  },
});

export const { setIncidentList, setSelectedIncident, setIncidentFilter } =
  incidentsSlice.actions;

export default incidentsSlice.reducer;
