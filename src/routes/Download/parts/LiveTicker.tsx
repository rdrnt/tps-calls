import { FunctionComponent, useMemo } from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';

import {
  getSeverity,
  severityDotClass,
  SAMPLE_CALLS,
  type TickerCall,
} from '../lib';

const MAX_TICKER_CALLS = 12;

/**
 * Full-bleed horizontal marquee of recent calls. Wires to live dispatch data
 * from the redux store when available; otherwise falls back to the design's
 * sample set. The track is rendered twice so the CSS marquee loops seamlessly,
 * and it pauses on hover (see download.css).
 */
const LiveTicker: FunctionComponent = () => {
  const incidents = useAppSelector(state => state.incidents.list);

  const calls: TickerCall[] = useMemo(() => {
    if (incidents.length === 0) {
      return SAMPLE_CALLS;
    }

    return [...incidents]
      .sort((a, b) => b.date - a.date)
      .slice(0, MAX_TICKER_CALLS)
      .map(incident => ({
        severity: getSeverity(incident.name),
        label: incident.name.toUpperCase(),
        time: format(new Date(incident.date), 'HH:mm'),
        location: incident.location,
      }));
  }, [incidents]);

  const loop = [...calls, ...calls];

  return (
    <div
      className="dl-marquee-wrap bg-background relative overflow-hidden border-y"
      aria-label="Recent Toronto Police calls"
    >
      <div className="dl-marquee">
        {loop.map((call, index) => (
          <div
            key={`${call.label}-${call.time}-${index}`}
            className="text-muted-foreground flex items-center gap-2.5 whitespace-nowrap border-r px-5 py-3.5 font-mono text-xs"
          >
            <span
              className={cn(
                'size-[7px] shrink-0 rounded-full',
                severityDotClass(call.severity)
              )}
            />
            <b className="text-foreground font-medium">{call.label}</b>{' '}
            {call.time} · {call.location}
          </div>
        ))}
      </div>
      <div className="dl-ticker-fade pointer-events-none absolute inset-0" />
    </div>
  );
};

export default LiveTicker;
