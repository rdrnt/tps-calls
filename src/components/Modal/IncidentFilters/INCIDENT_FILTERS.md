# Incident Filters

Filter modal for narrowing map incidents. Uses react-hook-form + Zod + shadcn.

## Files

```
IncidentFilters/
├── index.tsx           # Modal root — form setup, submit/reset
├── schema.ts           # Zod schema, constants, form ↔ Redux converters
└── parts/
    ├── FilterSection.tsx    # Collapsible toggle wrapper (shared)
    ├── DistanceFilter.tsx   # Slider (0.1–20 km)
    └── DateRangeFilter.tsx  # Calendar range picker + time inputs
```

## Data flow

1. Modal opens → reads Redux filter → `formValuesFromRedux()` → form defaults
2. User edits → changes stay local in the form
3. Apply → Zod validates → `onSubmit` maps to Redux shape → dispatches → closes
4. Reset → form defaults + empty Redux filter → closes

## Filters

**Distance** — Slider, 0.1–20 km, step 0.1, default 10. Enabled by default.

**Date Range** — Calendar range picker (Popover + Calendar) for dates, two time inputs. Disabled by default, pre-filled with last 6 hours.

Constraints:
- Start must be before end
- Max 6 hour window (`MAX_RANGE_HOURS`)
- End can't be in the future
- All fields required when enabled

## Date format flow

- Form: `yyyy-MM-dd` + `HH:mm` (separate strings)
- Redux: ISO-8601 strings
- `combineDateAndTime()` merges form → Date
- `formValuesFromRedux()` splits Redux ISO → form strings

## Adding a filter

1. Add to schema in `schema.ts` (include `enabled: z.boolean()`)
2. Update `getDefaultFormValues()` and `formValuesFromRedux()`
3. Extend `IncidentFilterState` in `store/slices/incidents.ts`
4. Create `parts/NewFilter.tsx` using `useFormContext` + `FilterSection`
5. Render in `index.tsx`, map to Redux in `onSubmit`
6. If the filter is a Firestore concern (reduces data over the wire), add it to `IncidentListener`
7. If the filter is a client-side concern, add it to `selectFilteredIncidents` in `store/selectors.ts`

## Architecture

Filters are split into two layers based on where they can run:

**Data source (Firestore)** — `IncidentListener` + `fetchFilteredIncidents` thunk

- Date range changes which documents are fetched. When active, the real-time
  `onSnapshot` listener is unsubscribed and replaced by a one-shot query via
  `getIncidentsAtDate()`. When cleared, the listener re-subscribes.
- Writes raw results to `state.incidents.list`.

**Client-side (selector)** — `selectFilteredIncidents` in `store/selectors.ts`

- Distance and search filter the already-fetched list.
- Distance uses `geolib.getDistance` against the user's coordinates.
- Search uses Fuse.js fuzzy matching on `name` and `location`.
- Memoized via `createSelector` — only recomputes when inputs change.
- `Map.tsx` and `MapSidebar` read through this selector.

```
Firestore (date range)  →  state.incidents.list (raw)
                                    ↓
                         selectFilteredIncidents
                           ├─ distance (geolib)
                           └─ search   (fuse.js)
                                    ↓
                           Map.tsx / MapSidebar
```

