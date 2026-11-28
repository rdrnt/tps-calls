import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider, useTheme } from './theme-provider';

const CurrentTheme = () => <p>{useTheme().theme}</p>;
const ResolvedTheme = () => <p>{useTheme().resolvedTheme}</p>;

describe('ThemeProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('falls back to the default theme when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    });

    render(
      <ThemeProvider defaultTheme="dark">
        <CurrentTheme />
      </ThemeProvider>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('resolves system to the OS theme and follows changes', () => {
    let dark = true;
    let notify = () => {};
    vi.spyOn(window, 'matchMedia').mockImplementation(
      query =>
        ({
          get matches() {
            return dark;
          },
          media: query,
          addEventListener: (_: string, listener: () => void) => {
            notify = listener;
          },
          removeEventListener: () => {},
        }) as unknown as MediaQueryList
    );

    render(
      <ThemeProvider defaultTheme="system" storageKey="test-theme">
        <ResolvedTheme />
      </ThemeProvider>
    );
    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');

    dark = false;
    act(() => notify());
    expect(screen.getByText('light')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
