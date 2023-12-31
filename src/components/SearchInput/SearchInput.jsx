'use client';
import styled from 'styled-components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export function SearchInput({ placeholder, onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    if (!value) {
      onSearch(null);
    }
    setValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    onSearch(value);
  };

  return (
    <Wrapper>
      <_Input
        type='search'
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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

  border: 1px solid #192655;
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
  border-top-right-radius: 0.05rem;
  border-bottom-right-radius: 0.05rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;

    background-color: #192655;
    color: #fff6f6;
  }

  svg {
    width: 24px;
    height: auto;
  }
`;
