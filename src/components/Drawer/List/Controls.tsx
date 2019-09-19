import * as React from 'react';
import styled from 'styled-components';
import { Colors, Sizes } from '../../../config';
import Text from '../../../components/Text';
import { IncidentFilterState } from 'store/incidents';

interface DrawerListControls {
  setFilter: (value: IncidentFilterState) => void;
}

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING}px ${Sizes.SPACING / 2}px;
  border-bottom: 1px solid ${Colors.BACKGROUND};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const SearchBar = styled.input`
  height: 25px;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${Colors.BACKGROUND};
  border-radius: 3px;
  padding: ${Sizes.SPACING / 2}px;
  margin-bottom: ${Sizes.SPACING / 2}px;
`;

const ToggleFilterOptionsButton = styled.button`
  background-color: transparent;
  border: none;
  padding-left: 0px;
`;

const DrawerListControls: React.FunctionComponent<DrawerListControls> = ({
  setFilter,
}) => {
  const [showFilterOptions, setShowFilterOptions] = React.useState<boolean>(
    false
  );

  const onSearchValueChanged = (value: string) => {
    const searchValue: string | undefined = Boolean(value) ? value : undefined;
    setFilter({ search: searchValue });
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Arrest, Front St, etc."
        onChange={event => onSearchValueChanged(event.target.value)}
      />
      <ToggleFilterOptionsButton
        onClick={() => setShowFilterOptions(!showFilterOptions)}
      >
        <Text as="p" size={12} weight="bold">
          Show filters
        </Text>
      </ToggleFilterOptionsButton>
    </Container>
  );
};

export default DrawerListControls;
