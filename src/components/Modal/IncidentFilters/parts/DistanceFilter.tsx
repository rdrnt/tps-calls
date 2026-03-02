/**
 * Distance filter — slider for search radius in km.
 * Uses watch/setValue instead of Controller because Radix Slider's
 * onValueChange(number[]) doesn't match react-hook-form's ChangeEvent API.
 */

import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Slider } from '../../../ui/slider';
import FilterSection from './FilterSection';
import {
  DISTANCE_MIN_KM,
  DISTANCE_MAX_KM,
  DISTANCE_STEP_KM,
  type IncidentFiltersFormValues,
} from '../schema';

const DistanceFilter: FunctionComponent = () => {
  const { watch, setValue } = useFormContext<IncidentFiltersFormValues>();

  const enabled = watch('distanceFilter.enabled');
  const distance = watch('distanceFilter.value');

  return (
    <FilterSection
      title="Distance"
      enabled={enabled}
      onEnabledChange={val => setValue('distanceFilter.enabled', val)}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground tabular-nums w-16 shrink-0">
          {distance} km
        </span>
        <Slider
          value={[distance]}
          min={DISTANCE_MIN_KM}
          max={DISTANCE_MAX_KM}
          step={DISTANCE_STEP_KM}
          className="w-full"
          onValueChange={([val]) => setValue('distanceFilter.value', val)}
        />
      </div>
    </FilterSection>
  );
};

export default DistanceFilter;
