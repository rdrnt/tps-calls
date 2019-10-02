import * as React from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import posed from 'react-pose';
import { darken } from 'polished';

import { Colors, Sizes } from '../../../config';
import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../../Text';
import { IncidentFilterState } from '../../../store/incidents';
import Icon from '../../Icon';
import { IconButton } from '../../Button';

interface DrawerHeader {
  setFilter: (value: IncidentFilterState) => void;
  filters: IncidentFilterState;
}

const Container = styled.div<{ showBottomBorder?: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: height 1s ease-in-out;
  border-bottom: ${props =>
    props.showBottomBorder
      ? `1px solid ${darken(0.2, Colors.BACKGROUND_SECONDARY)}`
      : 'none'};
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

const FilterContent = styled(
  posed.div({
    open: {
      height: 'auto',
    },
    closed: {
      height: 0,
    },
  })
)`
  padding-top: ${props =>
    props.pose === 'open' ? `${Sizes.SPACING / 2}px` : 0};
  width: 100%;
  overflow: hidden;
  display: flex;
`;

const SearchBar = styled.div`
  background-color: ${Colors.BACKGROUND};
  height: 35px;
  width: 100%;
  border-radius: 10px;
  ${createTextStyles({ ...DEFAULT_TEXT_STYLES.p, size: 12, lineHeight: 14 })};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  align-items: center;

  > input {
    background-color: inherit;
    border: none;
    flex-grow: 1;
  }
`;

const DrawerHeader: React.FunctionComponent<DrawerHeader> = ({
  setFilter,
  filters,
}) => {
  const [showFilters, setFilterVisibility] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const [updateStoreSearchValue] = useDebouncedCallback(
    (value: string | undefined) => {
      setFilter({ search: value });
    },
    200
  );

  React.useEffect(() => {
    const newSearchValue: string | undefined = Boolean(searchValue)
      ? searchValue
      : undefined;
    if (newSearchValue !== filters.search) {
      updateStoreSearchValue(newSearchValue);
    }
  }, [searchValue]);

  return (
    <Container showBottomBorder={showFilters}>
      <DefaultContent>
        <Text as="h1" size={24} lineHeight={28} weight="bold">
          Incidents
        </Text>
        <div>
          <button
            type="button"
            onClick={() => setFilterVisibility(!showFilters)}
          >
            <Icon
              name="slider"
              size={20}
              color={showFilters ? Colors.PRIMARY : 'black'}
            />
          </button>
        </div>
      </DefaultContent>
      <FilterContent pose={showFilters ? 'open' : 'closed'}>
        <SearchBar>
          <input
            type="text"
            placeholder="Dundas St, Stabbing, etc..."
            onChange={event => setSearchValue(event.target.value)}
            value={searchValue}
          />
        </SearchBar>
      </FilterContent>
    </Container>
  );
};

export default DrawerHeader;
