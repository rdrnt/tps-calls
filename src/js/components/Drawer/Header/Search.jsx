import React from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

import Icon from '../../Icon';

const StyledHeaderSearchContainer = styled.div`
  width: 100%;
  padding: 11px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeaderSearchInput = styled(DebounceInput)`
  width: 100%;
  border: none;
  height: 28px;
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const StyledHeaderSearchIcon = styled(Icon)`
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.54);
`;

const HeaderSearch = ({ value, onChange, placeholder }) => (
  <StyledHeaderSearchContainer>
    <StyledHeaderSearchInput
      type="text"
      name="search"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      debounceTimeout={300}
    />
    <StyledHeaderSearchIcon name="Search" color="inherit" />
  </StyledHeaderSearchContainer>
);

export default HeaderSearch;
