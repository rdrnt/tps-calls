import * as React from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

import { Colors, Sizes } from '../../../config';
import Text from '../../Text';
import { IncidentFilterState } from 'store/incidents';
import Icon from '../../Icon';

interface DrawerHeader {
  setFilter: (value: IncidentFilterState) => void;
  isScrolling: boolean;
}

const Container = styled.div<{ isScrolling: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 1s ease-in-out;

  box-shadow: ${props =>
    props.isScrolling ? '8px 8px rgba(0, 0, 0, 0.5)' : 'none'};
`;

const DefaultContent = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background-color: transparent;
    }
  }
`;

const DrawerHeader: React.FunctionComponent<DrawerHeader> = ({
  setFilter,
  isScrolling,
}) => {
  const [showFilterOptions, setShowFilterOptions] = React.useState<boolean>(
    false
  );
  const [setSearchValue] = useDebouncedCallback((value: string) => {
    const searchValue: string | undefined = Boolean(value) ? value : undefined;
    setFilter({ search: searchValue });
  }, 200);

  return (
    <Container isScrolling={isScrolling}>
      <DefaultContent>
        <Text as="h1" size={24} lineHeight={28} weight="bold">
          Incidents
        </Text>
        <div>
          <button type="button" onClick={() => {}}>
            <Icon name="slider" size={20} />
          </button>
          <button type="button" onClick={() => {}}>
            <Icon name="search" size={20} />
          </button>
        </div>
      </DefaultContent>
    </Container>
  );
};

export default DrawerHeader;
