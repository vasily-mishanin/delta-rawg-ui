'use client';

import { useState } from 'react';
import styled from 'styled-components';

export const CustomDropdown = ({ filterItem, options, onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(`Select ${filterItem}`);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (optionValue, optionName) => {
    setSelectedOption(optionName);
    toggleDropdown();
    onSelect(optionValue);
  };

  return (
    <CustomDropdownContainer>
      <SelectedOption onClick={toggleDropdown}>{selectedOption}</SelectedOption>
      <OptionsContainer
        style={{ display: isDropdownVisible ? 'flex' : 'none' }}
      >
        {options.map((option) => (
          <Option
            key={option.name}
            onClick={() => handleSelect(option.value, option.name)}
          >
            {option.name}
          </Option>
        ))}
      </OptionsContainer>
    </CustomDropdownContainer>
  );
};

const CustomDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: gray;
  width: 15rem;
`;

const SelectedOption = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const OptionsContainer = styled.div`
  position: absolute;
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  background: lightgray;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 2px 2px;
  max-height: 20rem;
  overflow: auto;
`;

const Option = styled.div`
  padding: 0.25rem 0.5rem 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    color: #2b2a4c;
  }
`;
