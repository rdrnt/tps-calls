import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

// Route smoke tests isolate rendering from remote Firestore and browser permission APIs.
vi.mock('./components/Listeners', () => ({
  IncidentListener: () => null,
  CameraListener: () => null,
  LocationListener: () => null,
}));

vi.mock('./hooks/useAnalyticsPageView', () => ({
  default: vi.fn(),
}));

const renderRoute = (path: string): void => {
  window.history.pushState({}, '', path);
  render(<App />);
};

afterEach(() => {
  cleanup();
});

describe('static application routes', () => {
  it('renders the contact page and email link', () => {
    renderRoute('/contact');

    expect(
      screen.getByRole('heading', { name: /get in touch/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'riley@drnt.ca' })
    ).toHaveAttribute('href', 'mailto:riley@drnt.ca');
  });

  it('renders the download page and product features', () => {
    renderRoute('/download');

    expect(
      screen.getByRole('heading', { name: /know what that siren was/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Live. Actually live.')).toBeInTheDocument();
    expect(screen.getByText(/calls in the last 20 minutes/i)).toBeInTheDocument();
  });
});
