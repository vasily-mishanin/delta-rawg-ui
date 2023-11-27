'use client';

import styled from 'styled-components';
import Image from 'next/image';

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
      <Rating>{rating}</Rating>
      <ReleaseDate>{released}</ReleaseDate>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  border: 1px solid white;
  padding: 1em;
`;

const Title = styled.h2`
  font-size: 1em;
  color: red;
`;

const Rating = styled.p`
  font-size: 1em;
  color: green;
`;

const ReleaseDate = styled.span`
  font-size: 1em;
  color: blue;
`;
