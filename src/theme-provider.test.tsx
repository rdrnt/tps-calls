import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider, useTheme } from './theme-provider';

const CurrentTheme = () => <p>{useTheme().theme}</p>;

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
});
