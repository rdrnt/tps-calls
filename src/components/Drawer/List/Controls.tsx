import * as React from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

import { Colors, Sizes } from '../../../config';
import Text from '../../../components/Text';
import { IncidentFilterState } from 'store/incidents';
import Icon from '../../../components/Icon';

interface DrawerListControls {
  setFilter: (value: IncidentFilterState) => void;
}

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING / 2}px;
  border-bottom: 1px solid ${Colors.BACKGROUND};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  transition: height 1s ease-in-out;
`;

const SearchContainer = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${Colors.BACKGROUND};
  border-bottom: 1px solid ${Colors.BACKGROUND};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.input`
  height: 100%;
  border: none;
  flex-grow: 1;
  padding: 0 3px;
`;

const ToggleFilterButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterContent = styled.div`
  width: 100%;
  height: 150px;
`;

const DrawerListControls: React.FunctionComponent<DrawerListControls> = ({
  setFilter,
}) => {
  const [showFilterOptions, setShowFilterOptions] = React.useState<boolean>(
    false
  );
  const [setSearchValue] = useDebouncedCallback((value: string) => {
    const searchValue: string | undefined = Boolean(value) ? value : undefined;
    setFilter({ search: searchValue });
  }, 200);

  return (
    <Container>
      <SearchContainer>
        <SearchBar
          placeholder="Search for Arrest, Front St, etc."
          onChange={event => setSearchValue(event.target.value)}
        />
        <ToggleFilterButton
          type="button"
          onClick={() => setShowFilterOptions(!showFilterOptions)}
        >
          <Icon
            name="slider"
            size={25}
            color={
              showFilterOptions ? Colors.PRIMARY : Colors.BACKGROUND_SECONDARY
            }
          />
        </ToggleFilterButton>
      </SearchContainer>
      {showFilterOptions && <FilterContent />}
    </Container>
  );
};

export default DrawerListControls;
