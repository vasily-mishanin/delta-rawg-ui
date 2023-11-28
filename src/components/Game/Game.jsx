'use client';

import { Slider } from '@/components/Slider/Slider';
import styled from 'styled-components';
import Link from 'next/link';

export function Game({ game, screenshots }) {
  return (
    <_Wtapper>
      <_StyledLink href='/'>← Back to games</_StyledLink>
      <_GameTitle>{game.name}</_GameTitle>
      <Slider images={screenshots} gameName={game.name} />
      <_Description>{game.description}</_Description>
      <_Website href={game.website}>{game.website}</_Website>
    </_Wtapper>
  );
}

const _Wtapper = styled.div`
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const _GameTitle = styled.h1`
  color: #2b2a4c;
`;

const _Description = styled.p`
  max-width: 70%;
  color: #45474b;

  @media (max-width: 500px) {
    max-width: 90%;
  }
`;

const _Website = styled.a`
  color: #190482;

  &:hover {
    color: #7752fe;
  }
`;

const _StyledLink = styled(Link)`
  color: #190482;
  font-size: 0.75rem;
  font-weight: bold;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;
