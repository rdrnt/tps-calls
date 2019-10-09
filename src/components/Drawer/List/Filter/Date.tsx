import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Timestamp } from '@google-cloud/firestore';

import Text from '../../../Text';
import { Sizes, Colors } from '../../../../config';
import Icon from '../../../Icon';
import { Button } from '../../../Button';
import { DateHelper } from '../../../../helpers';
import { onHover } from '../../../../helpers/hooks';

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
  value?: Timestamp;
  onChange: (newDate: Date) => void;
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

const DateFilter: React.FunctionComponent<DateFilter> = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) => {
  const [calendar, showCalendar] = React.useState<CalendarConfig | undefined>();

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
                value: startDate,
                onChange: (value: Date) =>
                  setStartDate(DateHelper.convertDateToTimestamp(value)),
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
                    value: endDate,
                    onChange: (value: Date) =>
                      setEndDate(DateHelper.convertDateToTimestamp(value)),
                  })
                }
                active={Boolean(calendar && calendar.id === 'end')}
              />
            </>
          )}
        </DateFilterContent>
        {calendar && (
          <CalendarContent>
            <DatePicker
              selected={
                calendar.value
                  ? DateHelper.convertTimestampToDate(
                      calendar.value as Timestamp
                    )
                  : new Date()
              }
              onChange={calendar.onChange}
              inline={true}
              showTimeSelect={true}
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
