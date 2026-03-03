/**
 * Date range filter — Calendar (Popover) for date selection + time inputs.
 *
 * Dates are stored as "yyyy-MM-dd" strings in the form, converted to/from
 * Date objects for the Calendar via parse/format. Time inputs use register
 * directly. Errors render inline beneath the relevant control.
 *
 * The calendar disables dates before MIN_DATE (earliest available incident
 * data) and after today. The schema performs the exact-timestamp validation.
 */

import { FunctionComponent, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { CalendarDays, Clock, Info } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { cn } from '../../../../lib/utils';
import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../../ui/input-group';
import { Label } from '../../../ui/label';
import { Separator } from '../../../ui/separator';
import { Alert, AlertDescription } from '../../../ui/alert';
import FilterSection from './FilterSection';
import {
  MAX_RANGE_HOURS,
  MIN_DATE,
  type IncidentFiltersFormValues,
} from '../schema';

const REF_DATE = new Date();

const DateRangeFilter: FunctionComponent = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IncidentFiltersFormValues>();

  const enabled = watch('dateRangeFilter.enabled');
  const startDateStr = watch('dateRangeFilter.startDate');
  const endDateStr = watch('dateRangeFilter.endDate');

  const today = new Date();
  const dateErrors = errors.dateRangeFilter;

  // Calendar Date objects → form strings
  const handleRangeSelect = (range: DateRange | undefined) => {
    setValue(
      'dateRangeFilter.startDate',
      range?.from ? format(range.from, 'yyyy-MM-dd') : ''
    );
    setValue(
      'dateRangeFilter.endDate',
      range?.to ? format(range.to, 'yyyy-MM-dd') : ''
    );
  };

  // Form strings → Date objects for Calendar
  const selectedRange = useMemo(() => {
    return {
      from: startDateStr
        ? parse(startDateStr, 'yyyy-MM-dd', REF_DATE)
        : undefined,
      to: endDateStr ? parse(endDateStr, 'yyyy-MM-dd', REF_DATE) : undefined,
    } as DateRange;
  }, [startDateStr, endDateStr]);

  const triggerLabel = useMemo(() => {
    if (selectedRange.from && selectedRange.to) {
      return `${format(selectedRange.from, 'LLL dd, y')} – ${format(selectedRange.to, 'LLL dd, y')}`;
    }
    if (selectedRange.from) {
      return `${format(selectedRange.from, 'LLL dd, y')} – …`;
    }
    return null;
  }, [selectedRange]);

  const hasDateError = !!(dateErrors?.startDate || dateErrors?.endDate);

  return (
    <FilterSection
      title="Date Range"
      enabled={enabled}
      onEnabledChange={val => setValue('dateRangeFilter.enabled', val)}
    >
      <div className="grid gap-4">
        {/* Calendar range picker */}
        <div className="grid gap-1.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                data-empty={!triggerLabel}
                className={cn(
                  'w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
                  hasDateError &&
                    'border-destructive ring-destructive/20 ring-[3px]'
                )}
              >
                <CalendarDays className="size-4 shrink-0" />
                {triggerLabel ?? 'Pick a date range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
                numberOfMonths={1}
                disabled={[{ before: MIN_DATE }, { after: today }]}
                defaultMonth={selectedRange.from ?? today}
              />
            </PopoverContent>
          </Popover>

          {dateErrors?.startDate && (
            <p className="text-xs text-destructive">
              {dateErrors.startDate.message}
            </p>
          )}
          {dateErrors?.endDate && (
            <p className="text-xs text-destructive">
              {dateErrors.endDate.message}
            </p>
          )}
        </div>

        <Separator />

        {/* Time inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="filter-start-time">Start Time</Label>
            <InputGroup>
              <InputGroupAddon>
                <Clock className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                id="filter-start-time"
                type="time"
                aria-invalid={!!dateErrors?.startTime}
                {...register('dateRangeFilter.startTime')}
              />
            </InputGroup>
            {dateErrors?.startTime && (
              <p className="text-xs text-destructive">
                {dateErrors.startTime.message}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="filter-end-time">End Time</Label>
            <InputGroup>
              <InputGroupAddon>
                <Clock className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                id="filter-end-time"
                type="time"
                aria-invalid={!!dateErrors?.endTime}
                {...register('dateRangeFilter.endTime')}
              />
            </InputGroup>
            {dateErrors?.endTime && (
              <p className="text-xs text-destructive">
                {dateErrors.endTime.message}
              </p>
            )}
          </div>
        </div>

        <Alert>
          <Info className="size-4" />
          <AlertDescription>
            Note: There is a {MAX_RANGE_HOURS} hour limit on the range. For
            longer ranges, please contact me.
          </AlertDescription>
        </Alert>
      </div>
    </FilterSection>
  );
};

export default DateRangeFilter;
