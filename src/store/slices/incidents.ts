import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Incident } from '@rdrnt/tps-calls-shared';
import { Timestamp } from 'firebase/firestore';

import { DateHelper } from '../../helpers';

export interface IncidentFilterState {
  search?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  distance?: number; // The number of kilometers
}

export interface IncidentsState {
  list: Incident<any>[];
  selected?: Incident<any>;
  filter: IncidentFilterState;
  oldestIncidentDate: Timestamp;
  newestIncidentDate: Timestamp;
}

const initialState: IncidentsState = {
  list: [],
  selected: undefined,
  filter: {},
  oldestIncidentDate: DateHelper.now(),
  newestIncidentDate: DateHelper.now(),
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setIncidentList: (state, action: PayloadAction<Incident<any>[]>) => {
      state.list = action.payload;
    },
    setSelectedIncident: (
      state,
      action: PayloadAction<Incident<any> | undefined>
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
    setFilterOldestDate: (state, action: PayloadAction<Timestamp>) => {
      state.oldestIncidentDate = action.payload;
    },
    setFilterNewestDate: (state, action: PayloadAction<Timestamp>) => {
      state.newestIncidentDate = action.payload;
    },
  },
});

export const {
  setIncidentList,
  setSelectedIncident,
  setIncidentFilter,
  setFilterOldestDate,
  setFilterNewestDate,
} = incidentsSlice.actions;

export default incidentsSlice.reducer;
