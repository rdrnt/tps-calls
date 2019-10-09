import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Timestamp } from '@rdrnt/tps-calls-shared';

import Text from '../../../Text';
import { Sizes, Colors } from '../../../../config';
import Icon from '../../../Icon';
import { Button } from '../../../Button';
import { DateHelper } from '../../../../helpers';
import { onHover } from '../../../../helpers/hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { setHours, setMinutes } from 'date-fns';

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
  setStartDate: (value: Timestamp) => void;
  setEndDate: (value: Timestamp) => void;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
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
    .react-datepicker__day--selected {
      background-color: ${Colors.PRIMARY};
    }
    li.react-datepicker__time-list-item--selected {
      background-color: ${Colors.PRIMARY};
    }
  }
`;

const Content = styled.div`
  border-radius: 6px;
  padding: ${Sizes.SPACING / 2}px;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const calculateMinTime = (currentValue: Date, oldestValue: Timestamp) => {
  const oldestValueDate = DateHelper.convertTimestampToDate(oldestValue);

  if (currentValue.getDate() === oldestValueDate.getDate()) {
    console.log('Matching min time', oldestValueDate.toLocaleTimeString());
    return oldestValueDate;
  }

  console.log('Not Matching min time', currentValue.toLocaleTimeString());
  return setHours(setMinutes(new Date(), 0), 0);
};

const calculateMaxTime = (currentValue: Date, newestValue: Timestamp) => {
  const newestValueDate = DateHelper.convertTimestampToDate(newestValue);

  if (currentValue.getDate() === newestValueDate.getDate()) {
    console.log('Matching Max time', newestValueDate.toLocaleTimeString());
    return newestValueDate;
  }
  console.log('Not mathcing max time', currentValue.toLocaleTimeString());
  return setHours(
    setMinutes(new Date(), currentValue.getHours()),
    currentValue.getMinutes()
  );
};

// Requirements
// The start date cannot be older than the oldest incident
// The end date cannot be newer than the newest incident
const DateFilter: React.FunctionComponent<DateFilter> = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
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

  const showCalendarWithConfig = (config: CalendarConfig) => {
    // if we have a calendar, hide it
    if (calendar && calendar.id !== config.id) {
      hideCalendar();
    } else {
      showCalendar(config);
    }
  };

  const changeStartDate = (newStartDate: Date) => {
    const oldestIncidentDate = DateHelper.convertTimestampToDate(
      incidentDates.oldest
    );
    console.log(
      'Setting new start date to',
      DateHelper.formatIncidentDate(
        DateHelper.convertDateToTimestamp(newStartDate)
      )
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
      return {
        minTime: setHours(setMinutes(new Date(), 0), 0),
        maxTime: setHours(
          setMinutes(new Date(), newestValueDate.getMinutes()),
          newestValueDate.getHours()
        ),
      };
    }

    if (
      currentValueDate.getDate() === oldestValueDate.getDate() &&
      currentValueDate.getDate() !== newestValueDate.getDate()
    ) {
      return {
        minTime: setHours(
          setMinutes(new Date(), oldestValueDate.getMinutes()),
          oldestValueDate.getHours()
        ),
        maxTime: setHours(setMinutes(new Date(), 59), 23),
      };
    }
  };

  // if the start date or end date update
  React.useEffect(() => {
    if (calendar) {
      if (calendar.id === 'start' && startDate) {
        showCalendarWithConfig({ ...calendar, value: startDate });
      }

      if (calendar.id === 'end' && endDate) {
        showCalendarWithConfig({ ...calendar, value: endDate });
      }
    }
  }, [startDate, endDate]);

  return (
    <Container>
      <Text as="h5">Date</Text>
      <Content>
        <DateFilterContent>
          <DateFilterItem
            value={startDate}
            onClick={() =>
              showCalendarWithConfig({
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
                  showCalendarWithConfig({
                    id: 'end',
                    value: endDate || DateHelper.now(),
                    onChange: (value: Date) =>
                      setEndDate(DateHelper.convertDateToTimestamp(value)),
                    min: startDate,
                    max: incidentDates.newest,
                  })
                }
                active={Boolean(calendar && calendar.id === 'end')}
              />
            </>
          )}
        </DateFilterContent>
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
