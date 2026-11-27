import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatIncidentDate } from './date';

describe('formatIncidentDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 23, 22, 0));
  });
  afterEach(() => vi.useRealTimers());

  it('formats today and older dates with the same time format', () => {
    expect(formatIncidentDate(new Date(2026, 10, 23, 21, 21))).toBe(
      'Today @ 9:21 PM'
    );
    expect(formatIncidentDate(new Date(2026, 10, 2, 9, 5))).toBe(
      'Nov 2, 2026 @ 9:05 AM'
    );
  });
});
