/** Severity buckets that drive the ticker dot colors. */
export type Severity = 'violent' | 'caution' | 'info';

/**
 * Classifies an incident by its name/type. Violent calls (assault, robbery,
 * break & enter, etc.) map to red; collisions/theft/hazards map to amber;
 * everything else is the neutral blue accent.
 */
export const getSeverity = (name: string): Severity => {
  const value = name.toLowerCase();
  if (
    /(assault|robbery|break|b&e|b & e|stab|shoot|gun|weapon|homicide|sexual|abduct)/.test(
      value
    )
  ) {
    return 'violent';
  }
  if (
    /(collision|crash|theft|steal|fire|hazard|injur|accident|struck)/.test(
      value
    )
  ) {
    return 'caution';
  }
  return 'info';
};

/** Tailwind background class for a severity's ticker dot (works in light/dark). */
export const severityDotClass = (severity: Severity): string => {
  switch (severity) {
    case 'violent':
      return 'bg-red-500';
    case 'caution':
      return 'bg-amber-500';
    default:
      return 'bg-blue-500';
  }
};

export interface TickerCall {
  severity: Severity;
  label: string;
  time: string;
  location: string;
}

/**
 * Fallback ticker contents (from the design reference) used when no live
 * dispatch data is available yet.
 */
export const SAMPLE_CALLS: TickerCall[] = [
  {
    severity: 'violent',
    label: 'ASSAULT',
    time: '14:02',
    location: 'Dundas & Yonge St',
  },
  {
    severity: 'caution',
    label: 'COLLISION',
    time: '13:58',
    location: 'Gardiner EB at Jarvis',
  },
  {
    severity: 'violent',
    label: 'ROBBERY',
    time: '13:55',
    location: 'King & Bathurst',
  },
  {
    severity: 'caution',
    label: 'THEFT',
    time: '13:51',
    location: 'Yonge-Dundas Square',
  },
  {
    severity: 'info',
    label: 'DISTURBANCE',
    time: '13:47',
    location: 'Queen & Spadina',
  },
  {
    severity: 'caution',
    label: 'COLLISION',
    time: '13:44',
    location: 'DVP at Bloor',
  },
  {
    severity: 'violent',
    label: 'ASSAULT',
    time: '13:40',
    location: 'Kensington Market',
  },
  {
    severity: 'violent',
    label: 'BREAK & ENTER',
    time: '13:36',
    location: 'Roncesvalles Ave',
  },
];

/** Window (minutes) used for the "calls in the last N minutes" hero count. */
export const RECENT_WINDOW_MINUTES = 20;
