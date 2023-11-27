import { GameCard } from '../GameCard/GameCard';

export function GamesList({ games }) {
  return (
    <ul>
      {games.map((game, index) => (
        <li key={game.id}>
          <span>{index + 1}</span> <GameCard {...game} />
        </li>
      ))}
    </ul>
  );
}
