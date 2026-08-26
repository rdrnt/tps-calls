import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { SITE_URL } from '@/config/seo';

import usePageMetadata from './usePageMetadata';

const setupDocumentHead = (): void => {
  document.head.innerHTML = `
    <title>Initial Title</title>
    <meta name="description" content="Initial description" />
    <meta property="og:title" content="Initial OG title" />
    <meta property="og:description" content="Initial OG description" />
    <meta property="og:url" content="${SITE_URL}" />
    <meta name="twitter:title" content="Initial Twitter title" />
    <meta name="twitter:description" content="Initial Twitter description" />
  `;
  document.title = 'Initial Title';
};

describe('usePageMetadata', () => {
  beforeEach(() => {
    setupDocumentHead();
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('updates title, description, Open Graph, Twitter, and canonical tags', () => {
    const { unmount } = renderHook(() =>
      usePageMetadata({
        title: 'Contact | tpscalls',
        description: 'Contact us about tpscalls.',
        canonicalPath: '/contact',
      })
    );

    expect(document.title).toBe('Contact | tpscalls');
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content')
    ).toBe('Contact us about tpscalls.');
    expect(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    ).toBe('Contact | tpscalls');
    expect(
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content')
    ).toBe('Contact us about tpscalls.');
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    ).toBe(`${SITE_URL}/contact`);
    expect(
      document
        .querySelector('meta[name="twitter:title"]')
        ?.getAttribute('content')
    ).toBe('Contact | tpscalls');
    expect(
      document
        .querySelector('meta[name="twitter:description"]')
        ?.getAttribute('content')
    ).toBe('Contact us about tpscalls.');
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(`${SITE_URL}/contact`);

    unmount();

    expect(document.title).toBe('Initial Title');
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content')
    ).toBe('Initial description');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('restores an existing canonical link instead of removing it', () => {
    const existingCanonical = document.createElement('link');
    existingCanonical.rel = 'canonical';
    existingCanonical.href = `${SITE_URL}/existing`;
    document.head.appendChild(existingCanonical);

    const { unmount } = renderHook(() =>
      usePageMetadata({
        title: 'Download the tpscalls App | tpscalls',
        description: 'Download page description.',
        canonicalPath: '/download',
      })
    );

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(`${SITE_URL}/download`);

    unmount();

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(`${SITE_URL}/existing`);
  });
});
