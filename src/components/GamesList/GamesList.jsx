'use client';
import { useEffect, useState } from 'react';
import { GameCard } from '../GameCard/GameCard';
import { Spinner } from '../Spinner/Spinner';
import { useInView } from 'react-intersection-observer';
import { getGames } from '@/actions/getGames';
import { delay } from '@/utils/delay';
import { StyledLink } from '@/components/Greeting';
import Link from 'next/link';
import { sortByDate } from '@/utils/sortByDate';

function GamesList({ initialGames, sortRating, sortRelease }) {
  const [games, setGames] = useState(initialGames);
  const [pagesLoaded, setPagesLoaded] = useState(1);

  let processedGames = games;

  if (sortRating === 'ASC') {
    processedGames = processedGames.sort((a, b) => a.rating - b.rating);
  }
  if (sortRating === 'DSC') {
    processedGames = processedGames.sort((a, b) => b.rating - a.rating);
  }

  if (sortRelease === 'ASC' || sortRelease === 'DSC') {
    processedGames = sortByDate(processedGames, sortRelease);
  }

  const { ref, inView } = useInView();

  const loadMoreGames = async () => {
    await delay(1500);
    const nextPage = pagesLoaded + 1;
    //const nextPage = (pagesLoaded % 10) + 1; // infinite in 10 pages
    const newGames = (await getGames(nextPage)) ?? [];
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
      <Link href='/?sortRating=ASC'>Rating ⬆️</Link>
      <Link href='/?sortRating=DSC'>Rating ⬇️</Link>
      <StyledLink href='/?sortRelease=ASC'> Release ⬇️</StyledLink>
      <StyledLink href='/?sortRelease=DSC'> Release ⬆️</StyledLink>
      <ul>
        {processedGames.map((game, index) => (
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
