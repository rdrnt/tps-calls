import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import Text from '../../Text';

interface HeaderDatePicker {
  date: Date;
  onChange: (newDate: Date) => void;
  label: string;
}

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DateContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
`;

const HeaderDatePicker: React.FunctionComponent<HeaderDatePicker> = ({
  date,
  onChange,
  label,
}) => {
  const [datePickerShowing, showDatePicker] = React.useState<boolean>(false);

  return (
    <Container>
      <Content>
        <Header>
          <Text as="h5">{label}</Text>
          <button
            type="button"
            onClick={() => showDatePicker(!datePickerShowing)}
          />
        </Header>

        {datePickerShowing && (
          <DatePicker
            selected={date}
            onChange={onChange}
            inline={true}
            showTimeSelect={true}
          />
        )}
      </Content>
    </Container>
  );
};

export default HeaderDatePicker;
