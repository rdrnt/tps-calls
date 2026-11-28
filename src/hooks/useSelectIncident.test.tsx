import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation, useNavigationType } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

import incidentsReducer from '../store/slices/incidents';
import { LocalIncident } from '../types';

import useSelectIncident from './useSelectIncident';

const incident = (id: string) =>
  ({ id, name: 'Assault', location: 'Yonge St' }) as LocalIncident;

const setup = (path: string) => {
  const store = configureStore({ reducer: { incidents: incidentsReducer } });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </Provider>
  );
  const { result } = renderHook(
    () => ({
      select: useSelectIncident(),
      location: useLocation(),
      navigationType: useNavigationType(),
    }),
    { wrapper }
  );
  return { result, store };
};

describe('useSelectIncident', () => {
  it('pushes the incident from the map, and goes back to the map on close', () => {
    const { result, store } = setup('/');

    act(() => result.current.select(incident('a')));
    expect(result.current.location.pathname).toBe('/a');
    expect(result.current.navigationType).toBe('PUSH');
    expect(store.getState().incidents.selected?.id).toBe('a');

    act(() => result.current.select(undefined));
    expect(result.current.location.pathname).toBe('/');
    expect(result.current.navigationType).toBe('POP');
    expect(store.getState().incidents.selected).toBeUndefined();
  });

  it('replaces the entry when switching incidents, so back still returns to the map', () => {
    const { result } = setup('/');

    act(() => result.current.select(incident('a')));
    act(() => result.current.select(incident('b')));
    expect(result.current.location.pathname).toBe('/b');
    expect(result.current.navigationType).toBe('REPLACE');

    act(() => result.current.select(undefined));
    expect(result.current.location.pathname).toBe('/');
    expect(result.current.navigationType).toBe('POP');
  });

  it('replaces a shared link with the map on close', () => {
    const { result } = setup('/a');

    act(() => result.current.select(undefined));
    expect(result.current.location.pathname).toBe('/');
    expect(result.current.navigationType).toBe('REPLACE');
  });
});
