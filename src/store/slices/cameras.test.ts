import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it, vi } from 'vitest';

import camerasReducer, { fetchCameras } from './cameras';

const { getCamerasById } = vi.hoisted(() => ({ getCamerasById: vi.fn() }));
vi.mock('../../helpers/firebase/cameras', () => ({ getCamerasById }));

const camera = (id: string) => ({
  id,
  name: id,
  cameras: [],
  location: { latitude: 0, longitude: 0 },
  date: 0,
});
const setup = () => configureStore({ reducer: { cameras: camerasReducer } });

describe('fetchCameras', () => {
  it('fetches only unknown cameras and marks missing ones as null', async () => {
    getCamerasById.mockReset().mockResolvedValue([camera('a')]);
    const store = setup();

    await store.dispatch(fetchCameras(['a', 'b']));
    expect(getCamerasById).toHaveBeenCalledWith(['a', 'b']);
    expect(store.getState().cameras.byId).toEqual({ a: camera('a'), b: null });

    await store.dispatch(fetchCameras(['a', 'b']));
    expect(getCamerasById).toHaveBeenCalledTimes(1);
  });

  it("doesn't request a camera that's already in flight", async () => {
    let resolve: (value: unknown) => void = () => {};
    getCamerasById
      .mockReset()
      .mockReturnValueOnce(new Promise(r => (resolve = r)))
      .mockResolvedValue([camera('c')]);
    const store = setup();

    const first = store.dispatch(fetchCameras(['a']));
    await vi.waitFor(() => expect(getCamerasById).toHaveBeenCalledTimes(1));
    await store.dispatch(fetchCameras(['a', 'c']));
    expect(getCamerasById).toHaveBeenLastCalledWith(['c']);

    resolve([camera('a')]);
    await first;
    expect(Object.keys(store.getState().cameras.byId).sort()).toEqual([
      'a',
      'c',
    ]);
    expect(store.getState().cameras.pending).toEqual({});
  });

  it('leaves failed cameras unset so they can be retried', async () => {
    getCamerasById.mockReset().mockRejectedValueOnce(new Error('offline'));
    const store = setup();

    await store.dispatch(fetchCameras(['a']));
    expect(store.getState().cameras).toEqual({ byId: {}, pending: {} });
  });
});
