import { createSelector } from '@reduxjs/toolkit';
import { haversineDistance, type Coordinates } from '@rdrnt/tps-calls-shared';
import Fuse from 'fuse.js';
import type { AppState } from '.';
import type { LocalIncident } from '../types';
import { useSelector } from 'react-redux';

/**
 * Unified client-side filtering selector.
 *
 * Applies ALL non-Firestore filters on top of whatever `state.incidents.list`
 * contains (which may already be date-range-narrowed by the thunk).
 *
 * Filter order: distance → search.  Both reduce the list; order of
 * intersection doesn't matter, but distance is cheaper so it runs first
 * to shrink the set before Fuse.js indexes it.
 */
// haversineDistance throws on a malformed coordinate; treat that incident as out of range.
const distanceKmOrInfinity = (a: Coordinates, b: Coordinates) => {
  try {
    return haversineDistance(a, b);
  } catch {
    return Infinity;
  }
};

export const selectFilteredIncidents = createSelector(
  (state: AppState) => state.incidents.list,
  (state: AppState) => state.incidents.filter.distance,
  (state: AppState) => state.incidents.filter.search,
  (state: AppState) => state.user.location.coordinates,
  (list, distanceKm, search, userCoords) => {
    let filtered: LocalIncident[] = list;

    // Distance filter (requires user location)
    if (distanceKm && userCoords) {
      filtered = filtered.filter(
        incident =>
          distanceKmOrInfinity(userCoords, incident.coordinates) <= distanceKm
      );
    }

    // Fuzzy text search
    if (search) {
      const fuse = new Fuse(filtered, { keys: ['name', 'location'] });
      filtered = fuse.search(search).map(result => result.item);
    }

    return filtered;
  }
);

export const useReduxIncidents = () => {
  return useSelector(selectFilteredIncidents);
};
