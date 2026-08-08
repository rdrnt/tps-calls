import { IncidentSourceType, IncidentType } from '@rdrnt/tps-calls-shared';
import { describe, expect, it } from 'vitest';

import type { AppState } from '.';
import { selectFilteredIncidents } from './selectors';
import type { IncidentFilterState } from './slices/incidents';
import type { LocalIncident } from '../types';

const incidents: LocalIncident[] = [
  {
    id: 'near-assault',
    source: IncidentSourceType.TORONTO_POLICE,
    type: IncidentType.ASSUALT_JUST_OCCURED,
    coordinates: { latitude: 43.6535, longitude: -79.3832 },
    name: 'ASSAULT',
    location: 'Yonge & Dundas',
    date: 1_725_000_000_000,
    data: {},
  },
  {
    id: 'near-collision',
    source: IncidentSourceType.TORONTO_POLICE,
    type: IncidentType.DEFAULT,
    coordinates: { latitude: 43.655, longitude: -79.385 },
    name: 'PERSONAL INJURY COLLISION',
    location: 'Queen & Bay',
    date: 1_725_000_060_000,
    data: {},
  },
  {
    id: 'far-robbery',
    source: IncidentSourceType.TORONTO_POLICE,
    type: IncidentType.DEFAULT,
    coordinates: { latitude: 45.5019, longitude: -73.5674 },
    name: 'ROBBERY',
    location: 'Montreal',
    date: 1_725_000_120_000,
    data: {},
  },
];

const makeState = (filter: IncidentFilterState = {}): AppState => ({
  incidents: {
    list: incidents,
    selected: undefined,
    filter,
    loading: false,
  },
  ui: {
    drawerOpen: false,
    loader: { open: false },
    modal: { open: false },
  },
  user: {
    location: {
      available: true,
      requesting: false,
      coordinates: { latitude: 43.6532, longitude: -79.3832 },
    },
  },
  cameras: {
    list: [],
    selected: undefined,
  },
});

describe('selectFilteredIncidents', () => {
  it('returns every incident when no filters are active', () => {
    expect(selectFilteredIncidents(makeState())).toEqual(incidents);
  });

  it('filters incidents by distance from the user', () => {
    expect(
      selectFilteredIncidents(makeState({ distance: 2 })).map(({ id }) => id)
    ).toEqual(['near-assault', 'near-collision']);
  });

  it('filters incidents with fuzzy text search', () => {
    expect(
      selectFilteredIncidents(makeState({ search: 'robbery' })).map(
        ({ id }) => id
      )
    ).toEqual(['far-robbery']);
  });

  it('combines distance and search filters', () => {
    expect(
      selectFilteredIncidents(
        makeState({ distance: 2, search: 'assault' })
      ).map(({ id }) => id)
    ).toEqual(['near-assault']);
  });
});
