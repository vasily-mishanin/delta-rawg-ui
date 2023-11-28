'use client';

import styled from 'styled-components';
import Image from 'next/image';

import { HandThumbUpIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

export function GameCard({ name, background_image, rating, released }) {
  return (
    <Wrapper>
      <Image
        src={background_image}
        width={330}
        height={(330 * 3) / 4}
        alt={name}
      />
      <Title>{name}</Title>
      <_InfoWrapper>
        <_Rating>
          <HandThumbUpIcon />
          {rating}
        </_Rating>
        <_ReleaseDate>
          <CalendarDaysIcon />
          {released}
        </_ReleaseDate>
      </_InfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1em;
  color: #192655;
`;

const _Rating = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1em;
  color: #435585;
  opacity: 0.75;

  svg {
    width: 24px;
  }
`;

const _ReleaseDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1em;
  color: #3876bf;
  opacity: 0.75;

  svg {
    width: 24px;
  }
`;

const _InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
