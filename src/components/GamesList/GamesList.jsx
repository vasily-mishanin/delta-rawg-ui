'use client';
import { useEffect, useState } from 'react';
import { GameCard } from '../GameCard/GameCard';
import { Spinner } from '../Spinner/Spinner';
import { useInView } from 'react-intersection-observer';
import { getGames } from '@/actions/getGames';
import { delay } from '@/utils/delay';

function GamesList({ initialGames }) {
  const [games, setGames] = useState(initialGames);
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const { ref, inView } = useInView();

  const loadMoreGames = async () => {
    await delay(1500);
    const nextPage = pagesLoaded + 1;
    //const nextPage = (pagesLoaded % 10) + 1; // infinite in 10 pages
    const newGames = (await getGames(nextPage)) ?? [];
    console.log({ newGames });
    setGames((prev) => [...prev, ...newGames]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      console.log('Have scrolled to the end');
      loadMoreGames();
    }
  }, [inView]);

  return (
    <>
      <ul>
        {games.map((game, index) => (
          <li key={game.id}>
            <span>{index + 1}</span> <GameCard {...game} />
          </li>
        ))}
      </ul>
      <div ref={ref}>
        <Spinner />
      </div>
    </>
  );
}
export default GamesList;
