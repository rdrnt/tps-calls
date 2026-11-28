import { describe, expect, it } from 'vitest';

import { LocalIncident } from '../../types';

import reducer, { fetchFilteredIncidents, setIncidentList } from './incidents';

const range = {
  startDate: '2026-11-01T00:00:00Z',
  endDate: '2026-11-02T00:00:00Z',
};

describe('incidents capped flag', () => {
  it('is set from a capped date-range result and cleared by the live list', () => {
    const capped = reducer(
      undefined,
      fetchFilteredIncidents.fulfilled(
        { incidents: [], capped: true },
        'id',
        range
      )
    );
    expect(capped.capped).toBe(true);

    const live = reducer(capped, setIncidentList([] as LocalIncident[]));
    expect(live.capped).toBe(false);
  });
});
