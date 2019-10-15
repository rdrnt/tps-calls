import * as React from 'react';
import styled from 'styled-components';

import { Colors, Sizes } from '../../../../config';
import Text from '../../../Text';
import Switch from '../../../Switch';

interface DrawerFilterRow {
  content: React.ReactElement;
  title: string;
  overrideOpen?: boolean;
  onChange?: (value: boolean) => void;
}

const Container = styled.div<{ showBorder?: boolean }>`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: ${props =>
    props.showBorder ? `solid 1px ${Colors.BORDER}` : 'none'};
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DrawerFilterRow: React.FunctionComponent<DrawerFilterRow> = ({
  content,
  title,
  onChange,
  overrideOpen,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleVisibility = (value?: boolean) => {
    const newValue = value !== undefined ? value : !open;
    if (onChange) {
      onChange(newValue);
    }

    setOpen(newValue);
  };

  React.useEffect(() => {
    toggleVisibility(overrideOpen);
  }, [overrideOpen]);

  return (
    <Container showBorder={!open}>
      <Heading>
        <Text as="h4">{title}</Text>
        <Switch value={open} onChange={toggleVisibility} />
      </Heading>
      {open && content}
    </Container>
  );
};

export default DrawerFilterRow;
