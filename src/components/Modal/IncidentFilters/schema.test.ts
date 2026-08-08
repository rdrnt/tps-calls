import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  MAX_RANGE_HOURS,
  combineDateAndTime,
  incidentFiltersSchema,
  type IncidentFiltersFormValues,
} from './schema';

const validValues = (): IncidentFiltersFormValues => ({
  distanceFilter: {
    enabled: true,
    value: 10,
  },
  dateRangeFilter: {
    enabled: true,
    startDate: '2025-01-02',
    startTime: '01:00',
    endDate: '2025-01-02',
    endTime: '06:00',
  },
});

const messagesFor = (values: IncidentFiltersFormValues): string[] => {
  const result = incidentFiltersSchema.safeParse(values);
  return result.success ? [] : result.error.issues.map(issue => issue.message);
};

describe('incidentFiltersSchema', () => {
  beforeEach(() => {
    // Freeze time so future-date validation cannot drift as the suite ages.
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-02T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('combines valid date and time fields', () => {
    expect(combineDateAndTime('2025-01-02', '06:30')).toEqual(
      new Date('2025-01-02T06:30')
    );
    expect(combineDateAndTime('', '06:30')).toBeNull();
    expect(combineDateAndTime('not-a-date', '06:30')).toBeNull();
  });

  it('accepts empty date fields when the date filter is disabled', () => {
    const values = validValues();
    values.dateRangeFilter = {
      enabled: false,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    };

    expect(incidentFiltersSchema.safeParse(values).success).toBe(true);
  });

  it('requires all date fields when the date filter is enabled', () => {
    const values = validValues();
    values.dateRangeFilter.startDate = '';
    values.dateRangeFilter.endTime = '';

    expect(messagesFor(values)).toEqual(
      expect.arrayContaining(['Start date is required', 'End time is required'])
    );
  });

  it('rejects a start that is not before the end', () => {
    const values = validValues();
    values.dateRangeFilter.startTime = '07:00';

    expect(messagesFor(values)).toContain('Start must be before end');
  });

  it(`rejects ranges longer than ${MAX_RANGE_HOURS} hours`, () => {
    const values = validValues();
    values.dateRangeFilter.startDate = '2025-01-01';

    expect(messagesFor(values)).toContain(
      `Range cannot exceed ${MAX_RANGE_HOURS} hours`
    );
  });

  it('rejects dates before incident history begins', () => {
    const values = validValues();
    values.dateRangeFilter.startDate = '2019-09-24';
    values.dateRangeFilter.endDate = '2019-09-24';

    expect(messagesFor(values)).toContain(
      'No data available before Sep 25, 2019'
    );
  });

  it('rejects an end date in the future', () => {
    const values = validValues();
    values.dateRangeFilter.startTime = '10:00';
    values.dateRangeFilter.endTime = '13:00';

    expect(messagesFor(values)).toContain('End cannot be in the future');
  });
});
