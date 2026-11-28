import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { LocalIncident } from '../../types';

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

/** A date range can match thousands of incidents; only the newest this many are loaded. */
export const DATE_RANGE_LIMIT = 500;

export interface IncidentsState {
  list: LocalIncident[];
  /** True when a date-range result hit DATE_RANGE_LIMIT. */
  capped: boolean;
  selected?: LocalIncident;
  filter: IncidentFilterState;
  loading: boolean;
  /** True once the active data source has returned its first snapshot or query result. */
  listReady: boolean;
}

// ── Thunks ──────────────────────────────────────────────────────────

/** Fetch incidents from Firestore within the given ISO-8601 date range. */
export const fetchFilteredIncidents = createAsyncThunk(
  'incidents/fetchFiltered',
  async (dateRange: IncidentDateRangeFilter) => {
    // Firestore/date-filter code is loaded only when the historical filter is used,
    // keeping static routes out of that dependency path.
    // A dynamic import('date-fns') would pull in the whole library, so parse with Date.
    const [
      { convertDateToTimestamp },
      { getIncidentsAtDate, toLocalIncident },
    ] = await Promise.all([
      import('../../helpers/date'),
      import('../../helpers/firebase/incident'),
    ]);

    const startTimestamp = convertDateToTimestamp(
      new Date(dateRange.startDate)
    );
    const endTimestamp = convertDateToTimestamp(new Date(dateRange.endDate));

    const incidents = await getIncidentsAtDate({
      startDate: startTimestamp,
      endDate: endTimestamp,
      max: DATE_RANGE_LIMIT,
    });

    return {
      incidents: incidents.map(toLocalIncident),
      capped: incidents.length >= DATE_RANGE_LIMIT,
    };
  }
);

// ── Slice ───────────────────────────────────────────────────────────

const initialState: IncidentsState = {
  list: [],
  capped: false,
  selected: undefined,
  filter: {},
  loading: false,
  listReady: false,
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setIncidentList: (state, action: PayloadAction<LocalIncident[]>) => {
      state.list = action.payload;
      state.capped = false;
    },
    setIncidentsListReady: (state, action: PayloadAction<boolean>) => {
      state.listReady = action.payload;
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
        state.listReady = false;
      })
      .addCase(fetchFilteredIncidents.fulfilled, (state, action) => {
        state.list = action.payload.incidents;
        state.capped = action.payload.capped;
        state.loading = false;
        state.listReady = true;
      })
      .addCase(fetchFilteredIncidents.rejected, state => {
        state.capped = false;
        state.loading = false;
        state.listReady = true;
      });
  },
});

export const {
  setIncidentList,
  setIncidentsListReady,
  setSelectedIncident,
  setIncidentFilter,
} = incidentsSlice.actions;

export default incidentsSlice.reducer;
