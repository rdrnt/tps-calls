import { FunctionComponent, useMemo } from 'react';
import { Link } from 'react-router';
import { Radio, MousePointerClick, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { IncidentListener } from '@/components/Listeners';
import { DOWNLOAD_METADATA } from '@/config/seo';
import useAnalyticsPageView from '@/hooks/useAnalyticsPageView';
import usePageMetadata from '@/hooks/usePageMetadata';
import { useAppSelector } from '@/store';

import { RECENT_WINDOW_MINUTES } from './lib';
import LiveTicker from './parts/LiveTicker';
import DownloadButtons from './parts/DownloadButtons';
import Reveal from './parts/Reveal';
import heroAppPreview300Avif from '@/assets/images/heroAppPreview-300.avif';
import heroAppPreview600Avif from '@/assets/images/heroAppPreview-600.avif';
import heroAppPreview300Webp from '@/assets/images/heroAppPreview-300.webp';
import heroAppPreview600Webp from '@/assets/images/heroAppPreview-600.webp';
import heroAppPreviewFallback from '@/assets/images/heroAppPreview-600.png';

import './download.css';

// The hero's pieces fade up one after another on load.
const HERO_IN =
  'animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-500 ease-out';
const heroDelay = (ms: number) => ({ animationDelay: `${ms}ms` });

const HERO_PREVIEW_WIDTH = 300;
const HERO_PREVIEW_HEIGHT = 591;

/**
 * Counts how many incidents fall within a `RECENT_WINDOW_MINUTES` window.
 *
 * The window is anchored to the most recent dispatch in the store rather than
 * to wall-clock "now": the public TPS feed ingests in batches and goes quiet
 * overnight, so a strict "now − 20min" window is frequently empty and would
 * render a misleading "0" in the hero. Anchoring keeps the count a meaningful
 * indicator of recent activity.
 */
const useRecentCallCount = (): number => {
  const incidents = useAppSelector(state => state.incidents.list);

  return useMemo(() => {
    if (incidents.length === 0) {
      return 0;
    }
    const newest = incidents.reduce(
      (max, incident) => Math.max(max, incident.date),
      0
    );
    const cutoff = newest - RECENT_WINDOW_MINUTES * 60 * 1000;
    return incidents.filter(incident => incident.date >= cutoff).length;
  }, [incidents]);
};

const FEATURES = [
  {
    icon: Radio,
    title: 'Live. Actually live.',
    body: "Calls hit the map the moment they're dispatched. Arrests, crashes, assaults, all of it. You're watching it happen, not reading about it the next day.",
  },
  {
    icon: MousePointerClick,
    title: 'The whole call, one tap.',
    body: "Tap a pin and you get the call type, the nearest intersection, and the time it came in. Laid out plain, so you're not guessing.",
  },
  {
    icon: Eye,
    title: 'See it for yourself.',
    body: 'Every call links to the closest traffic cameras, so you can check the scene with your own eyes.',
  },
];

const DownloadPage: FunctionComponent = () => {
  usePageMetadata(DOWNLOAD_METADATA);
  useAnalyticsPageView({ path: '/download' });

  const recentCalls = useRecentCallCount();

  return (
    <>
      <IncidentListener />
      <div className="bg-background text-foreground h-screen w-full overflow-y-auto antialiased">
        <div className="mx-auto w-full max-w-5xl px-5">
          {/* Wordmark */}
          <SiteHeader />

          {/* Hero */}
          <header className="grid items-center gap-10 pb-16 pt-4 md:grid-cols-2 md:gap-8 md:pb-24">
            <div>
              <Badge
                variant="outline"
                className={cn(
                  'text-tpscalls-primary border-tpscalls-primary/30 bg-tpscalls-primary/10 gap-2 rounded-full px-3 py-1 text-xs font-medium',
                  HERO_IN
                )}
              >
                <span className="dl-dot" />
                <span>
                  {/* Keyed so the number ticks in when the count changes. */}
                  <span
                    key={recentCalls}
                    className="animate-in fade-in slide-in-from-bottom-1 inline-block tabular-nums duration-300"
                  >
                    {recentCalls}
                  </span>{' '}
                  calls in the last {RECENT_WINDOW_MINUTES} minutes
                </span>
              </Badge>
              <h1
                className={cn(
                  'mt-5 text-[40px] font-semibold leading-[1.04] tracking-tight sm:text-6xl',
                  HERO_IN
                )}
                style={heroDelay(80)}
              >
                Know what that siren was.
              </h1>
              <p
                className={cn(
                  'text-muted-foreground mt-5 max-w-md text-base leading-relaxed sm:text-lg',
                  HERO_IN
                )}
                style={heroDelay(160)}
              >
                Every Toronto Police call lands on the map the second it gets
                published. Tap a pin for the call type, the closest
                intersection, and a live look through the nearest city camera.
                No scanner needed, no waiting for the news.
              </p>
              <div className={HERO_IN} style={heroDelay(240)}>
                <DownloadButtons
                  className="mt-7 flex flex-wrap gap-3"
                  withIcons
                  withWebApp
                />
              </div>
            </div>

            <div
              className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-backwards flex justify-center duration-700 ease-out md:justify-end"
              style={heroDelay(150)}
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${heroAppPreview300Avif} 300w, ${heroAppPreview600Avif} 600w`}
                  sizes={`${HERO_PREVIEW_WIDTH}px`}
                />
                <source
                  type="image/webp"
                  srcSet={`${heroAppPreview300Webp} 300w, ${heroAppPreview600Webp} 600w`}
                  sizes={`${HERO_PREVIEW_WIDTH}px`}
                />
                <img
                  src={heroAppPreviewFallback}
                  alt="The tpscalls app showing a live incident on the map with a nearby city camera"
                  width={HERO_PREVIEW_WIDTH}
                  height={HERO_PREVIEW_HEIGHT}
                  decoding="async"
                  fetchPriority="high"
                  className="h-auto w-[300px] max-w-[82vw] select-none"
                  draggable={false}
                />
              </picture>
            </div>
          </header>
        </div>

        {/* Live ticker (full-bleed) */}
        <LiveTicker />

        <div className="mx-auto w-full max-w-5xl px-5">
          {/* Feature cards */}
          <section className="grid gap-4 py-14 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 90} className="h-full">
                <Card className="h-full gap-0 rounded-xl p-5 shadow-sm">
                  <div className="text-tpscalls-primary border-tpscalls-primary/20 bg-tpscalls-primary/10 flex size-9 items-center justify-center rounded-[10px] border">
                    <Icon size={16} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </section>

          {/* Footer */}
          <SiteFooter
            actions={<DownloadButtons className="flex gap-3" withIcons />}
          >
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-foreground mt-3 inline-block font-mono text-[11px] underline underline-offset-4 transition-colors"
            >
              Contact
            </Link>
          </SiteFooter>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
