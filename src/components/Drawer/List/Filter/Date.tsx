import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import Text from '../../../Text';
import { Sizes, Colors } from '../../../../config';
import Icon from '../../../Icon';

const ItemContainer = styled.button<{ color: string }>`
  margin: 0;
  display: block;
  border: none;
  background-color: ${Colors.BACKGROUND};
`;

interface DateFilterItem {
  dateValue: string;
  onClick: () => void;
  active: boolean;
}

const DateFilterItem: React.FunctionComponent<DateFilterItem> = ({
  dateValue,
  onClick,
  active,
}) => {
  const [color, setColor] = React.useState<string>('black');

  React.useEffect(() => {
    if (active) {
      setColor(Colors.PRIMARY);
    } else if (!active) {
      setColor('black');
    }
  }, [active]);

  return (
    <ItemContainer type="button" color={color} onClick={onClick}>
      <Icon size={15} name="calendar" color={color} />
      <Text as="p" size={12} lineHeight={12} color={color}>
        {dateValue}
      </Text>
    </ItemContainer>
  );
};

/*
  Calendar contents below
*/

interface CalendarConfig {
  id: 'start' | 'end';
  value: Date;
}

interface DateFilter {
  startDate: Date;
  endDate: Date;
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
  margin-top: ${Sizes.SPACING / 2}px;
  .customCalendar {
    font-family: 'Poppins', arial, sans-serif;
    .react-datepicker__day--selected {
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
}) => {
  const [calendar, showCalendar] = React.useState<CalendarConfig | undefined>();

  const showCalendarWithConfig = (config: CalendarConfig) => {
    // if we have a calendar, hide it
    if (calendar) {
      showCalendar(undefined);
    } else {
      showCalendar(config);
    }
  };

  return (
    <Container>
      <Text as="h5">Date</Text>
      <Content>
        <DateFilterContent>
          <DateFilterItem
            dateValue="2019-0-1 @ 9:30pm"
            onClick={() =>
              showCalendarWithConfig({
                id: 'start',
                value: startDate,
              })
            }
            active={Boolean(calendar && calendar.id === 'start')}
          />
          <Icon name="right-arrow" size={20} />
          <DateFilterItem
            dateValue="2019-04-31 @ 10:20am"
            onClick={() =>
              showCalendarWithConfig({
                id: 'end',
                value: endDate,
              })
            }
            active={Boolean(calendar && calendar.id === 'end')}
          />
        </DateFilterContent>
        {calendar && (
          <CalendarContent>
            <DatePicker
              selected={calendar.value}
              onChange={newDate => console.log('new date')}
              inline={true}
              showTimeSelect={true}
              calendarClassName="customCalendar"
            />
          </CalendarContent>
        )}
      </Content>
    </Container>
  );
};

export default DateFilter;
