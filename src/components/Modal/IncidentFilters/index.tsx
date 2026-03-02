/**
 * Incident filters modal — react-hook-form + Zod.
 * FormProvider wraps children so filter components use useFormContext.
 * Reads/writes Redux filter state for persistence across open/close.
 */

import { FunctionComponent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';

import { DialogHeader, DialogFooter, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';

import { ModalProps } from '..';
import DistanceFilter from './parts/DistanceFilter';
import DateRangeFilter from './parts/DateRangeFilter';

import {
  incidentFiltersSchema,
  getDefaultFormValues,
  formValuesFromRedux,
  combineDateAndTime,
  type IncidentFiltersFormValues,
} from './schema';
import { setIncidentFilter } from '../../../store/slices/incidents';
import type { AppState } from '../../../store';

const IncidentFiltersModal: FunctionComponent<ModalProps> = ({ close }) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: AppState) => state.incidents.filter
  );

  const methods = useForm<IncidentFiltersFormValues>({
    resolver: zodResolver(incidentFiltersSchema),
    defaultValues: formValuesFromRedux(currentFilter),
  });

  /** Map form values → Redux shape and dispatch. */
  const onSubmit = (data: IncidentFiltersFormValues) => {
    const distance = data.distanceFilter.enabled
      ? data.distanceFilter.value
      : undefined;

    let dateRange: { startDate: string; endDate: string } | undefined;
    if (data.dateRangeFilter.enabled) {
      const start = combineDateAndTime(
        data.dateRangeFilter.startDate,
        data.dateRangeFilter.startTime
      );
      const end = combineDateAndTime(
        data.dateRangeFilter.endDate,
        data.dateRangeFilter.endTime
      );
      if (start && end) {
        dateRange = {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        };
      }
    }

    dispatch(
      setIncidentFilter({
        values: { distance, dateRange },
        merge: false,
      })
    );

    // TODO: trigger Firebase query from filter values

    close();
  };

  const onReset = () => {
    methods.reset(getDefaultFormValues());
    dispatch(setIncidentFilter({ values: {}, merge: false }));
    close();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <DialogHeader className="mb-6">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <DistanceFilter />
          <DateRangeFilter />
        </div>

        <DialogFooter className="flex-row justify-center gap-4 mt-4">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">Apply</Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default IncidentFiltersModal;
