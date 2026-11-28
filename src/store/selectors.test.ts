import { describe, expect, it } from 'vitest';

import type { AppState } from '.';
import type { LocalIncident } from '../types';
import { selectFilteredIncidents } from './selectors';

const incident = (id: string, latitude: number, longitude: number) =>
  ({
    id,
    name: id,
    location: '',
    coordinates: { latitude, longitude },
  }) as LocalIncident;

const state = (list: LocalIncident[], distance?: number) =>
  ({
    incidents: { list, filter: { distance } },
    user: {
      location: { coordinates: { latitude: 43.6532, longitude: -79.3832 } },
    },
  }) as unknown as AppState;

describe('distance filter', () => {
  it('keeps incidents within the distance and drops malformed coordinates', () => {
    const list = [
      incident('near', 43.6577, -79.3832), // ~0.5 km north
      incident('far', 43.7532, -79.3832), // ~11 km north
      incident('broken', Number.NaN, -79.3832),
    ];

    expect(selectFilteredIncidents(state(list, 1)).map(i => i.id)).toEqual([
      'near',
    ]);
    expect(selectFilteredIncidents(state(list, 20)).map(i => i.id)).toEqual([
      'near',
      'far',
    ]);
    expect(selectFilteredIncidents(state(list)).length).toBe(3);
  });
});
