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
        <Option
          key='null-option'
          onClick={() => handleSelect(null, `Select ${filterItem}`)}
        >
          - reset filter -
        </Option>
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
  width: 15rem;
  position: relative;
  display: inline-block;
  background-color: #192655;
  color: #fff6f6;
`;

const SelectedOption = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: none;

  &:hover {
    opacity: 0.75;
  }
`;

const OptionsContainer = styled.div`
  width: 100%;
  position: absolute;
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  background: #265073;
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
    background-color: #192655;
    color: #fff6f6;
  }
`;
