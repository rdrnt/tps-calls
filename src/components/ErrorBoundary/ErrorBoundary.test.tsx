import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '.';

const Crash = (): never => {
  throw new Error('render failed');
};

describe('ErrorBoundary', () => {
  it('shows the fallback when a child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Crash />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to map' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
