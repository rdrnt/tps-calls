import { Timestamp } from 'firebase/firestore';
import { describe, expect, it, vi } from 'vitest';

vi.mock('.', () => ({ firestore: {} }));
vi.mock('firebase/firestore', async importOriginal => ({
  ...(await importOriginal<typeof import('firebase/firestore')>()),
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

import { getDoc } from 'firebase/firestore';
import { getIncidentFromId } from './incident';

describe('getIncidentFromId', () => {
  it('converts the Firestore timestamp to milliseconds', async () => {
    const date = new Date('2025-12-01T12:00:00Z');
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ id: 'abc', date: Timestamp.fromDate(date) }),
    } as never);

    const incident = await getIncidentFromId('abc');

    expect(incident?.date).toBe(date.valueOf());
  });

  it('returns undefined when the incident does not exist', async () => {
    vi.mocked(getDoc).mockResolvedValue({ exists: () => false } as never);

    expect(await getIncidentFromId('missing')).toBeUndefined();
  });
});
