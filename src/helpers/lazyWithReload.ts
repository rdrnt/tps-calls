import { lazy } from 'react';

const RELOAD_KEY = 'tpscalls:lazy-reload';
const RELOAD_COOLDOWN_MS = 10_000;

const canReload = (): boolean => {
  try {
    const lastReload = Number(sessionStorage.getItem(RELOAD_KEY));
    if (Date.now() - lastReload < RELOAD_COOLDOWN_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    return true;
  } catch {
    return false;
  }
};

// Browsers cache a failed import, and a deploy removes old chunks, so reload instead of retrying.
export const importWithReload = <T>(
  factory: () => Promise<T>,
  reload = () => window.location.reload()
): Promise<T> =>
  factory().catch(error => {
    if (!canReload()) throw error;
    reload();
    return new Promise<T>(() => {});
  });

export const lazyWithReload: typeof lazy = factory =>
  lazy(() => importWithReload(factory));
