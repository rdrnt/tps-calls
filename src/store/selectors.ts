import { createSelector } from '@reduxjs/toolkit';
import { getDistance } from 'geolib';
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
export const selectFilteredIncidents = createSelector(
  (state: AppState) => state.incidents.list,
  (state: AppState) => state.incidents.filter.distance,
  (state: AppState) => state.incidents.filter.search,
  (state: AppState) => state.user.location.coordinates,
  (list, distanceKm, search, userCoords) => {
    let filtered: LocalIncident[] = list;

    // Distance filter (requires user location)
    if (distanceKm && userCoords) {
      const maxMeters = distanceKm * 1000;
      filtered = filtered.filter(incident => {
        const meters = getDistance(
          {
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
          },
          {
            latitude: incident.coordinates.latitude,
            longitude: incident.coordinates.longitude,
          }
        );
        return meters <= maxMeters;
      });
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
