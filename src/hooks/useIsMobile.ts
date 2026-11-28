import { useState, useEffect } from 'react';

// Matches Tailwind's md breakpoint, so components agree on what counts as mobile.
const MOBILE_QUERY = '(max-width: 767px)';
const MOBILE_KEYWORDS = [
  'android',
  'webos',
  'iphone',
  'ipad',
  'ipod',
  'blackberry',
  'windows phone',
  'mobile',
];

const checkIsMobile = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUA = MOBILE_KEYWORDS.some(keyword =>
    userAgent.includes(keyword)
  );
  return (
    window.matchMedia(MOBILE_QUERY).matches ||
    (isMobileUA && window.innerWidth < 768)
  );
};

// https://www.usehooks.io/docs/use-is-mobile
export const useIsMobile = (): { isMobile: boolean } => {
  // Checked during the first render, so phones never get a frame of the desktop layout.
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const update = () => setIsMobile(checkIsMobile());
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    mediaQuery.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mediaQuery.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { isMobile };
};

export default useIsMobile;
