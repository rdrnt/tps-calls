import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { LocalIncident } from '../../types';
import { convertDateToTimestamp } from '../../helpers/date';
import { getIncidentsAtDate } from '../../helpers/firebase/incident';

/** ISO date range used by the date filter (start/end as ISO-8601 strings). */
export interface IncidentDateRangeFilter {
  startDate: string;
  endDate: string;
}

export interface IncidentFilterState {
  search?: string;
  distance?: number; // The number of kilometers
  dateRange?: IncidentDateRangeFilter;
}

export interface IncidentsState {
  list: LocalIncident[];
  selected?: LocalIncident;
  filter: IncidentFilterState;
  loading: boolean;
}

// ── Thunks ──────────────────────────────────────────────────────────

/** Fetch incidents from Firestore within the given ISO-8601 date range. */
export const fetchFilteredIncidents = createAsyncThunk(
  'incidents/fetchFiltered',
  async (dateRange: IncidentDateRangeFilter) => {
    const startTimestamp = convertDateToTimestamp(parseISO(dateRange.startDate));
    const endTimestamp = convertDateToTimestamp(parseISO(dateRange.endDate));

    const incidents = await getIncidentsAtDate({
      startDate: startTimestamp,
      endDate: endTimestamp,
    });

    const localIncidents: LocalIncident[] = incidents.map(incident => ({
      ...incident,
      date: incident.date.toDate().valueOf(),
    }));

    return localIncidents;
  }
);

// ── Slice ───────────────────────────────────────────────────────────

const initialState: IncidentsState = {
  list: [],
  selected: undefined,
  filter: {},
  loading: false,
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
  extraReducers: builder => {
    builder
      .addCase(fetchFilteredIncidents.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFilteredIncidents.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilteredIncidents.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setIncidentList, setSelectedIncident, setIncidentFilter } =
  incidentsSlice.actions;

export default incidentsSlice.reducer;
