import { GameCard } from '../GameCard/GameCard';
import Link from 'next/link';

export function GamesList({ games }) {
  return (
    <ul>
      {games.map((game, index) => (
        <li key={game.id}>
          <span>{index + 1}</span>{' '}
          <Link href={`/game/${game.slug}`}>
            <GameCard {...game} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
