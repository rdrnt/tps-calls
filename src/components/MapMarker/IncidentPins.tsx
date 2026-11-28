import * as React from 'react';
import { Layer, Source, useMap } from 'react-map-gl/mapbox';
import type {
  CircleLayerSpecification,
  GeoJSONSource,
  ExpressionSpecification,
  FilterSpecification,
} from 'mapbox-gl';
import type { FeatureCollection, Point } from 'geojson';

import { Colors } from '../../config';
import { LocalIncident } from '../../types';

const SOURCE_ID = 'incidents';
// The effect below sets the real data; a constant here stops React from overwriting it.
const EMPTY: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

export const PIN_LAYER_ID = 'incident-pins';
/** Wider and invisible, so pins are easier to tap than their 17px dot. */
export const PIN_HIT_LAYER_ID = 'incident-pins-hit';

const FADE_MS = 300;

// Each pin fades and grows in over FADE_MS from its own `bornAt` time.
const fadeIn = (
  now: number,
  from: number,
  to: number
): ExpressionSpecification => [
  'interpolate',
  ['linear'],
  ['-', now, ['get', 'bornAt']],
  0,
  from,
  FADE_MS,
  to,
];

// Radius 6.5 plus the 2px ring matches the old 17px DOM pin.
const fadePaint = (now: number) => ({
  'circle-radius': fadeIn(now, 3.25, 6.5),
  'circle-opacity': fadeIn(now, 0, 1),
  'circle-stroke-opacity': fadeIn(now, 0, 1),
});

const PIN_PAINT: CircleLayerSpecification['paint'] = {
  ...fadePaint(0),
  'circle-color': Colors.PRIMARY,
  'circle-stroke-color': '#ffffff',
  'circle-stroke-width': 2,
  // Night lighting would otherwise dim the pins.
  'circle-emissive-strength': 1,
  // The fade is driven frame by frame, so Mapbox's own easing would lag it.
  'circle-radius-transition': { duration: 0 },
  'circle-opacity-transition': { duration: 0 },
  'circle-stroke-opacity-transition': { duration: 0 },
};

const HIT_PAINT: CircleLayerSpecification['paint'] = {
  'circle-radius': 16,
  'circle-color': 'rgba(0, 0, 0, 0)',
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface IncidentPinsProps {
  incidents: LocalIncident[];
  selectedId?: string;
  /** False until the map and first incidents are ready; pins stagger in once it flips. */
  revealed: boolean;
}

/** The incident pins, drawn by Mapbox as one circle layer instead of a DOM element each. */
const IncidentPins: React.FunctionComponent<IncidentPinsProps> = ({
  incidents,
  selectedId,
  revealed,
}) => {
  const { current: map } = useMap();
  // When each pin started fading in; kept so re-renders don't replay it.
  const bornAt = React.useRef(new Map<string, number>());

  // Feeds the source and drives the fade outside React, so neither re-renders the map.
  React.useEffect(() => {
    const mapInstance = map?.getMap();
    if (!mapInstance) return;

    const seen = bornAt.current;
    const now = performance.now();
    if (revealed) {
      const firstReveal = seen.size === 0;
      const instant = prefersReducedMotion();
      incidents.forEach((incident, index) => {
        if (seen.has(incident.id)) return;
        // The first batch staggers in newest first as the loader fades; later arrivals fade in on their own.
        const delay = firstReveal ? 150 + Math.min(index * 8, 400) : 0;
        seen.set(incident.id, instant ? -Infinity : now + delay);
      });
    }

    const data: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: revealed
        ? incidents.map(incident => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                incident.coordinates.longitude,
                incident.coordinates.latitude,
              ],
            },
            properties: { id: incident.id, bornAt: seen.get(incident.id) },
          }))
        : [],
    };
    const lastStart = Math.max(
      0,
      ...data.features.map(feature => {
        const start = Number(feature.properties?.bornAt);
        return Number.isFinite(start) ? start : 0;
      })
    );

    let frame = 0;
    let dataSet = false;
    const step = () => {
      const source = mapInstance.getSource<GeoJSONSource>(SOURCE_ID);
      // The style may still be loading; try again next frame.
      if (!source || !mapInstance.getLayer(PIN_LAYER_ID)) {
        frame = requestAnimationFrame(step);
        return;
      }
      if (!dataSet) {
        source.setData(data);
        dataSet = true;
      }
      const time = performance.now();
      const paint = fadePaint(time);
      mapInstance.setPaintProperty(
        PIN_LAYER_ID,
        'circle-radius',
        paint['circle-radius']
      );
      mapInstance.setPaintProperty(
        PIN_LAYER_ID,
        'circle-opacity',
        paint['circle-opacity']
      );
      mapInstance.setPaintProperty(
        PIN_LAYER_ID,
        'circle-stroke-opacity',
        paint['circle-stroke-opacity']
      );
      // Stop once the newest pin has finished; the paint then stays at its end state.
      if (time < lastStart + FADE_MS) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [map, incidents, revealed]);

  // The selected incident is drawn by its own marker, so hide its pin.
  const filter = React.useMemo<FilterSpecification>(
    () => ['!=', ['get', 'id'], selectedId ?? ''],
    [selectedId]
  );

  return (
    <Source id={SOURCE_ID} type="geojson" data={EMPTY}>
      <Layer id={PIN_HIT_LAYER_ID} type="circle" slot="top" paint={HIT_PAINT} />
      <Layer
        id={PIN_LAYER_ID}
        type="circle"
        slot="top"
        paint={PIN_PAINT}
        filter={filter}
      />
    </Source>
  );
};

export default IncidentPins;
