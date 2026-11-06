import { afterEach, describe, expect, it, vi } from 'vitest';

import { importWithReload } from './lazyWithReload';

describe('importWithReload', () => {
  afterEach(() => {
    sessionStorage.clear();
    vi.useRealTimers();
  });

  it('returns the module when the import succeeds', async () => {
    const reload = vi.fn();

    await expect(
      importWithReload(() => Promise.resolve('module'), reload)
    ).resolves.toBe('module');
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads once, then throws if the import fails again right away', async () => {
    const reload = vi.fn();
    const error = new Error('Importing a module script failed.');
    const failingImport = () => Promise.reject(error);

    void importWithReload(failingImport, reload);
    await vi.waitFor(() => expect(reload).toHaveBeenCalledOnce());

    await expect(importWithReload(failingImport, reload)).rejects.toBe(error);
    expect(reload).toHaveBeenCalledOnce();
  });

  it('reloads again after the cooldown', async () => {
    vi.useFakeTimers();
    const reload = vi.fn();
    const failingImport = () => Promise.reject(new Error('failed'));

    void importWithReload(failingImport, reload);
    await vi.waitFor(() => expect(reload).toHaveBeenCalledTimes(1));

    vi.advanceTimersByTime(10_000);
    void importWithReload(failingImport, reload);
    await vi.waitFor(() => expect(reload).toHaveBeenCalledTimes(2));
  });
});
