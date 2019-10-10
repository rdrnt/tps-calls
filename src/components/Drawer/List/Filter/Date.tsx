import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Timestamp } from '@rdrnt/tps-calls-shared';

import { clearFilters } from '.';

import Text from '../../../Text';
import { Sizes, Colors } from '../../../../config';
import Icon from '../../../Icon';
import { Button } from '../../../Button';
import { DateHelper } from '../../../../helpers';
import { onHover } from '../../../../helpers/hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
const ItemContainer = styled.button<{ color: string }>`
  margin: 0;
  display: block;
  border: none;
  background-color: ${Colors.BACKGROUND};
`;

interface DateFilterItem {
  value?: Timestamp;
  onClick: () => void;
  active: boolean;
}

const DateFilterItem: React.FunctionComponent<DateFilterItem> = ({
  value,
  onClick,
  active,
}) => {
  const [color, setColor] = React.useState<string>('black');
  const [hovering, hoverProps] = onHover();

  React.useEffect(() => {
    if (active || hovering) {
      setColor(Colors.PRIMARY);
    } else if (!active || !hovering) {
      setColor('black');
    }
  }, [active, hovering]);

  return (
    <ItemContainer
      type="button"
      color={color}
      onClick={onClick}
      {...hoverProps}
    >
      <Icon size={15} name="calendar" color={color} />
      <Text as="p" size={12} lineHeight={12} color={color}>
        {value ? DateHelper.formatIncidentDate(value) : 'Current'}
      </Text>
    </ItemContainer>
  );
};

/*
  Calendar contents below
*/

interface CalendarConfig {
  id: 'start' | 'end';
  value: Timestamp;
  onChange: (newDate: Date) => void;
  min?: DateHelper.Timestamp;
  max?: DateHelper.Timestamp;
}

interface DateFilter {
  startDate?: Timestamp;
  endDate?: Timestamp;
  setStartDate: (value?: Timestamp) => void;
  setEndDate: (value?: Timestamp) => void;
  clearFilters: clearFilters;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  border-radius: 6px;
  padding: ${Sizes.SPACING / 2}px;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DateFilterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CalendarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${Sizes.SPACING / 2}px;
  .customCalendar {
    font-family: 'Poppins', arial, sans-serif;
    background-color: ${Colors.BACKGROUND};
    .react-datepicker__day--selected {
      background-color: ${Colors.PRIMARY};
    }
    /* Hack to make the time have the correct background color */
    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
      background-color: ${Colors.PRIMARY};
    }
  }
`;

// Requirements
// The start date cannot be older than the oldest incident
// The end date cannot be newer than the newest incident
const DateFilter: React.FunctionComponent<DateFilter> = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  clearFilters,
}) => {
  const [calendar, showCalendar] = React.useState<CalendarConfig | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const incidentDates = useSelector((state: AppState) => ({
    oldest: state.incidents.oldestIncidentDate,
    newest: state.incidents.newestIncidentDate,
  }));

  const hideCalendar = () => {
    showCalendar(undefined);
  };

  const clearDates = () => {
    clearFilters({ ignoreFields: ['search'] });
  };

  // if the start date or end date update
  React.useEffect(() => {
    if (calendar) {
      // if the start date updates, update the calendar
      if (calendar.id === 'start' && startDate) {
        showCalendar({ ...calendar, value: startDate });
      }

      // if the end date is set, close the calendar
      if (calendar.id === 'end' && endDate) {
        // showCalendar({ ...calendar, value: endDate });
        hideCalendar();
      }
    }
  }, [startDate, endDate]);

  const changeStartDate = (newStartDate: Date) => {
    const oldestIncidentDate = DateHelper.convertTimestampToDate(
      incidentDates.oldest
    );
    if (newStartDate < oldestIncidentDate) {
      setErrorMessage(
        'Start date cannot be older than ' +
          DateHelper.formatIncidentDate(incidentDates.oldest)
      );
    } else {
      setStartDate(DateHelper.convertDateToTimestamp(newStartDate));
    }
  };

  const changeEndDate = (newEndDate: Date) => {
    // If the start date and end date are more than 10 hours apart, don't apply the new end date
    if (
      DateHelper.compareHourDifference(
        startDate!,
        DateHelper.convertDateToTimestamp(newEndDate)
      ) > 10
    ) {
      setErrorMessage('Date cannot be more than hours apart');
    } else {
      setEndDate(DateHelper.convertDateToTimestamp(newEndDate));
    }
  };

  const calculateMinMaxTime = (
    currentValue: DateHelper.Timestamp,
    newestValue: DateHelper.Timestamp,
    oldestValue: DateHelper.Timestamp
  ) => {
    const currentValueDate = DateHelper.convertTimestampToDate(currentValue);
    const newestValueDate = DateHelper.convertTimestampToDate(newestValue);
    const oldestValueDate = DateHelper.convertTimestampToDate(oldestValue);

    // if the current value is equal to the newest incident
    if (
      currentValueDate.getDate() === newestValueDate.getDate() &&
      currentValueDate.getDate() !== oldestValueDate.getDate()
    ) {
      // Set the minimum time to the start of the day
      // Set the max time to the time of the newest incident
      return {
        minTime: DateHelper.createDateWithHoursAndMinutes({
          hours: 0,
          minutes: 0,
        }),
        maxTime: DateHelper.createDateWithHoursAndMinutes({
          hours: newestValueDate.getHours(),
          minutes: newestValueDate.getMinutes(),
        }),
      };
    }

    if (
      currentValueDate.getDate() === oldestValueDate.getDate() &&
      currentValueDate.getDate() !== newestValueDate.getDate()
    ) {
      return {
        // Set the minimum time to when the oldest incident occured
        // Set the minimum time to the end of that day
        minTime: DateHelper.createDateWithHoursAndMinutes({
          hours: oldestValueDate.getHours(),
          minutes: oldestValueDate.getMinutes(),
        }),
        maxTime: DateHelper.createDateWithHoursAndMinutes({
          hours: 23,
          minutes: 59,
        }),
      };
    }
  };

  return (
    <Container>
      <Text as="h5">Date</Text>
      <Content>
        <DateFilterContent>
          <DateFilterItem
            value={startDate}
            onClick={() =>
              showCalendar({
                id: 'start',
                value: startDate || DateHelper.now(),
                onChange: changeStartDate,
                min: incidentDates.oldest,
                max: incidentDates.newest,
              })
            }
            active={Boolean(calendar && calendar.id === 'start')}
          />
          {startDate && (
            <>
              <Icon name="right-arrow" size={20} />
              <DateFilterItem
                value={endDate}
                onClick={() =>
                  showCalendar({
                    id: 'end',
                    value: endDate || DateHelper.now(),
                    onChange: changeEndDate,
                    min: startDate,
                    max: incidentDates.newest,
                  })
                }
                active={Boolean(calendar && calendar.id === 'end')}
              />
            </>
          )}
        </DateFilterContent>
        {!calendar && startDate && endDate && (
          <Button label="clear" onClick={clearDates} />
        )}
        {calendar && (
          <CalendarContent>
            {errorMessage && <Text as="span">{errorMessage}</Text>}
            <DatePicker
              selected={DateHelper.convertTimestampToDate(calendar.value)}
              onChange={calendar.onChange}
              inline={true}
              showTimeSelect={true}
              minDate={
                calendar.min && DateHelper.convertTimestampToDate(calendar.min)
              }
              maxDate={
                calendar.max && DateHelper.convertTimestampToDate(calendar.max)
              }
              {...calculateMinMaxTime(
                calendar.value,
                incidentDates.newest,
                incidentDates.oldest
              )}
              timeIntervals={15}
              calendarClassName="customCalendar"
            />
            <Button label="close" onClick={hideCalendar} />
          </CalendarContent>
        )}
      </Content>
    </Container>
  );
};

export default DateFilter;
