import { FunctionComponent, useMemo } from 'react';
import { Link } from 'react-router';
import { Radio, MousePointerClick, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import useAnalyticsPageView from '@/hooks/useAnalyticsPageView';
import { useAppSelector } from '@/store';

import { RECENT_WINDOW_MINUTES } from './lib';
import LiveTicker from './parts/LiveTicker';
import DownloadButtons from './parts/DownloadButtons';
import HeroAppPreview from '@/assets/images/heroAppPreview.png';

import './download.css';

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
  useAnalyticsPageView({ path: '/download' });

  const recentCalls = useRecentCallCount();

  return (
    <div className="bg-background text-foreground h-screen w-full overflow-y-auto antialiased">
      <div className="mx-auto w-full max-w-5xl px-5">
        {/* Wordmark */}
        <SiteHeader />

        {/* Hero */}
        <header className="grid items-center gap-10 pb-16 pt-4 md:grid-cols-2 md:gap-8 md:pb-24">
          <div>
            <Badge
              variant="outline"
              className="text-tpscalls-primary border-tpscalls-primary/30 bg-tpscalls-primary/10 gap-2 rounded-full px-3 py-1 text-xs font-medium"
            >
              <span className="dl-dot" />
              {recentCalls} calls in the last {RECENT_WINDOW_MINUTES} minutes
            </Badge>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.04] tracking-tight sm:text-6xl">
              Know what that{' '}
              <span className="text-tpscalls-primary">siren</span> was.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed sm:text-lg">
              Every Toronto Police call lands on the map the second it gets
              published. Tap a pin for the call type, the closest intersection,
              and a live look through the nearest city camera. No scanner
              needed, no waiting for the news.
            </p>
            <DownloadButtons
              className="mt-7 flex flex-wrap gap-3"
              withIcons
              withWebApp
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={HeroAppPreview}
              alt="The tpscalls app showing a live incident on the map with a nearby city camera"
              className="h-auto w-[300px] max-w-[82vw] select-none"
              draggable={false}
            />
          </div>
        </header>
      </div>

      {/* Live ticker (full-bleed) */}
      <LiveTicker />

      <div className="mx-auto w-full max-w-5xl px-5">
        {/* Feature cards */}
        <section className="grid gap-4 py-14 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="gap-0 rounded-xl p-5 shadow-sm">
              <div className="text-tpscalls-primary border-tpscalls-primary/20 bg-tpscalls-primary/10 flex size-9 items-center justify-center rounded-[10px] border">
                <Icon size={16} />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {body}
              </p>
            </Card>
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
  );
};

export default DownloadPage;
