'use client';
import styled from 'styled-components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export function SearchInput({ placeholder, onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    console.log('handleChange', value);
    if (!value) {
      onSearch(null);
    }
    setValue(value);
  };

  const handleSearchClick = () => {
    onSearch(value);
    console.log(value);
  };

  return (
    <Wrapper>
      <_Input
        type='search'
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <_SearchButton onClick={handleSearchClick}>
        <MagnifyingGlassIcon />
      </_SearchButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 20rem;
  height: 2.5rem;
  display: flex;

  border: 1px solid lightgray;
  border-radius: 0.15rem;
`;

const _Input = styled.input`
  width: 85%;
  height: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  font-size: 1.25rem;
  border: none;
  outline: none;
`;

const _SearchButton = styled.button`
  width: 15%;
  padding: 0.25rem;
  border: none;
  border-radius: 0;
  border-top-right-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  svg {
    width: 24px;
    height: auto;
  }
`;
