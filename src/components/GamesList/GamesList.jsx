import styled from 'styled-components';
import { GameCard } from '../GameCard/GameCard';
import Link from 'next/link';

export function GamesList({ games }) {
  return (
    <_List>
      {games.map((game, index) => (
        <_ListItem key={game.id}>
          <Link href={`/game/${game.slug}`}>
            <GameCard {...game} />
          </Link>
        </_ListItem>
      ))}
    </_List>
  );
}

const _List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const _ListItem = styled.ul`
  display: flex;
`;
