/**
 * Zod schema, constants, and form ↔ Redux conversion helpers
 * for the incident filters modal.
 */

import { z } from 'zod';
import { differenceInHours, format, subHours, parseISO } from 'date-fns';

import type { IncidentFilterState } from '../../../store/slices/incidents';

// ── Constants ───────────────────────────────────────────────────────

export const MAX_RANGE_HOURS = 6;

/** Earliest available incident data — nothing exists before this timestamp. (prod) */
export const MIN_DATE = new Date('2019-09-25T04:08:00-04:00');

export const DISTANCE_MIN_KM = 0.1;
export const DISTANCE_MAX_KM = 20;
export const DISTANCE_STEP_KM = 0.1;
export const DISTANCE_DEFAULT_KM = 10;

// ── Helpers ─────────────────────────────────────────────────────────

/** Merge "yyyy-MM-dd" + "HH:mm" into a Date. Returns null if invalid. */
export const combineDateAndTime = (date: string, time: string): Date | null => {
  if (!date || !time) return null;
  const combined = new Date(`${date}T${time}`);
  return isNaN(combined.getTime()) ? null : combined;
};

// ── Schema ──────────────────────────────────────────────────────────

// The top-level object has one key per filter section in the modal.
// Each section has an `enabled` boolean tied to its FilterSection toggle.
// zodResolver passes this whole shape to react-hook-form.
export const incidentFiltersSchema = z.object({
  // ── Distance filter ─────────────────────────────────────────────
  distanceFilter: z.object({
    enabled: z.boolean(), // Switch toggle — false = exclude from query
    value: z
      .number()
      .min(DISTANCE_MIN_KM, `Minimum distance is ${DISTANCE_MIN_KM} km`)
      .max(DISTANCE_MAX_KM, `Maximum distance is ${DISTANCE_MAX_KM} km`),
  }),

  // ── Date range filter ───────────────────────────────────────────
  // The base .object() defines the field types. The chained
  // .superRefine() adds cross-field validation that only runs
  // when `enabled` is true — so the form stays valid while the
  // section is collapsed.
  dateRangeFilter: z
    .object({
      enabled: z.boolean(), // Switch toggle
      startDate: z.string(), // "yyyy-MM-dd" from Calendar
      startTime: z.string(), // "HH:mm" from time input
      endDate: z.string(), // "yyyy-MM-dd" from Calendar
      endTime: z.string(), // "HH:mm" from time input
    })
    // superRefine gives us access to all fields at once + a context
    // (ctx) to push errors to specific field paths. This is needed
    // because our rules compare multiple fields against each other.
    .superRefine((data, ctx) => {
      // Section is off — skip everything so the form can submit cleanly
      if (!data.enabled) return;

      // -- Step 1: Required checks --
      // Each addIssue targets a specific `path` so the error renders
      // beneath the correct input in DateRangeFilter.tsx.
      if (!data.startDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Start date is required',
          path: ['startDate'], // → errors.dateRangeFilter.startDate
        });
      }
      if (!data.startTime) {
        ctx.addIssue({
          code: 'custom',
          message: 'Start time is required',
          path: ['startTime'], // → errors.dateRangeFilter.startTime
        });
      }
      if (!data.endDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'End date is required',
          path: ['endDate'], // → errors.dateRangeFilter.endDate
        });
      }
      if (!data.endTime) {
        ctx.addIssue({
          code: 'custom',
          message: 'End time is required',
          path: ['endTime'], // → errors.dateRangeFilter.endTime
        });
      }

      // Bail if any field is empty — can't do cross-field checks yet
      if (!data.startDate || !data.startTime || !data.endDate || !data.endTime)
        return;

      // -- Step 2: Parse strings into Dates --
      // combineDateAndTime merges "yyyy-MM-dd" + "HH:mm" → Date
      const start = combineDateAndTime(data.startDate, data.startTime);
      const end = combineDateAndTime(data.endDate, data.endTime);

      // Guard against malformed values that somehow passed the inputs
      if (!start) {
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid start date/time',
          path: ['startDate'],
        });
        return;
      }
      if (!end) {
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid end date/time',
          path: ['endDate'],
        });
        return;
      }

      // -- Step 3: Business rules --

      // Start must come before end
      if (start >= end) {
        ctx.addIssue({
          code: 'custom',
          message: 'Start must be before end',
          path: ['startDate'],
        });
      }

      // No incident data exists before MIN_DATE
      if (start < MIN_DATE) {
        ctx.addIssue({
          code: 'custom',
          message: 'No data available before Sep 25, 2019',
          path: ['startDate'],
        });
      }

      // Can't filter for incidents that haven't happened yet
      if (end > new Date()) {
        ctx.addIssue({
          code: 'custom',
          message: 'End cannot be in the future',
          path: ['endDate'],
        });
      }

      // Cap the window size to keep Firestore queries reasonable
      if (Math.abs(differenceInHours(end, start)) > MAX_RANGE_HOURS) {
        ctx.addIssue({
          code: 'custom',
          message: `Range cannot exceed ${MAX_RANGE_HOURS} hours`,
          path: ['endTime'],
        });
      }
    }),
});

// ── Types ───────────────────────────────────────────────────────────

export type IncidentFiltersFormValues = z.infer<typeof incidentFiltersSchema>;

// ── Default & hydration ─────────────────────────────────────────────

/** Fresh defaults. Distance on at 10 km, date range off but pre-filled to last 6 hours. */
export const getDefaultFormValues = (): IncidentFiltersFormValues => {
  const now = new Date();
  const rangeStart = subHours(now, MAX_RANGE_HOURS);

  return {
    distanceFilter: {
      enabled: true,
      value: DISTANCE_DEFAULT_KM,
    },
    dateRangeFilter: {
      enabled: false,
      startDate: format(rangeStart, 'yyyy-MM-dd'),
      startTime: format(rangeStart, 'HH:mm'),
      endDate: format(now, 'yyyy-MM-dd'),
      endTime: format(now, 'HH:mm'),
    },
  };
};

/** Convert Redux filter state → form values so the modal reopens with previous selections. */
export const formValuesFromRedux = (
  filter: IncidentFilterState
): IncidentFiltersFormValues => {
  const defaults = getDefaultFormValues();

  const hasDistance = filter.distance !== undefined;
  const hasDateRange = !!filter.dateRange;

  return {
    distanceFilter: {
      enabled: hasDistance,
      value: filter.distance ?? defaults.distanceFilter.value,
    },
    // Split Redux ISO strings back into separate date/time strings
    dateRangeFilter: hasDateRange
      ? {
          enabled: true,
          startDate: format(
            parseISO(filter.dateRange!.startDate),
            'yyyy-MM-dd'
          ),
          startTime: format(parseISO(filter.dateRange!.startDate), 'HH:mm'),
          endDate: format(parseISO(filter.dateRange!.endDate), 'yyyy-MM-dd'),
          endTime: format(parseISO(filter.dateRange!.endDate), 'HH:mm'),
        }
      : defaults.dateRangeFilter,
  };
};
