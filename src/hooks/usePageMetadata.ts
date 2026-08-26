import { useEffect } from 'react';

import { SITE_URL } from '@/config/seo';

type PageMetadataOptions = {
  title: string;
  description: string;
  canonicalPath: string;
};

type MetaTagSpec = {
  attr: 'name' | 'property';
  key: string;
  value: string;
};

const getMetaElement = (
  key: string,
  attr: 'name' | 'property'
): HTMLMetaElement => {
  const selector =
    attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  const existing = document.querySelector(selector);

  if (existing instanceof HTMLMetaElement) {
    return existing;
  }

  const element = document.createElement('meta');
  element.setAttribute(attr, key);
  document.head.appendChild(element);
  return element;
};

const usePageMetadata = ({
  title,
  description,
  canonicalPath,
}: PageMetadataOptions): void => {
  useEffect(() => {
    const priorTitle = document.title;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    const metaTags: MetaTagSpec[] = [
      { attr: 'name', key: 'description', value: description },
      { attr: 'property', key: 'og:title', value: title },
      { attr: 'property', key: 'og:description', value: description },
      { attr: 'property', key: 'og:url', value: canonicalUrl },
      { attr: 'name', key: 'twitter:title', value: title },
      { attr: 'name', key: 'twitter:description', value: description },
    ];

    const priorMetaValues = metaTags.map(({ attr, key }) => {
      const selector =
        attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
      const element = document.querySelector(selector);

      return {
        element,
        priorContent:
          element instanceof HTMLMetaElement
            ? element.getAttribute('content')
            : null,
        created: !(element instanceof HTMLMetaElement),
        attr,
        key,
      };
    });

    document.title = title;

    for (const { attr, key, value } of metaTags) {
      getMetaElement(key, attr).setAttribute('content', value);
    }

    const existingCanonical = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !(existingCanonical instanceof HTMLLinkElement);
    const canonicalElement = createdCanonical
      ? document.createElement('link')
      : existingCanonical;
    const priorCanonicalHref = createdCanonical
      ? null
      : canonicalElement.getAttribute('href');

    if (createdCanonical) {
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }

    canonicalElement.href = canonicalUrl;

    return () => {
      // Restoration prevents metadata from a lazy route leaking into the next route during client-side navigation.
      document.title = priorTitle;

      for (const { element, priorContent, created } of priorMetaValues) {
        if (created) {
          element?.remove();
          continue;
        }

        if (element instanceof HTMLMetaElement) {
          if (priorContent === null) {
            element.removeAttribute('content');
          } else {
            element.setAttribute('content', priorContent);
          }
        }
      }

      if (createdCanonical) {
        canonicalElement.remove();
      } else if (priorCanonicalHref !== null) {
        canonicalElement.setAttribute('href', priorCanonicalHref);
      }
    };
  }, [title, description, canonicalPath]);
};

export default usePageMetadata;
