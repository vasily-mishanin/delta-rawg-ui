'use client';
import { useEffect, useState } from 'react';
import { GameCard } from '../GameCard/GameCard';
import { Spinner } from '../Spinner/Spinner';
import { useInView } from 'react-intersection-observer';
import { fetchGames } from '@/actions/fetchGames';
import { delay } from '@/utils/delay';
import { StyledLink } from '@/components/Greeting';
import Link from 'next/link';
import { sortByDate } from '@/utils/sortByDate';
import { CustomDropdown } from '../Select/CustomDropdown';

function GamesList({ initialGames, platforms, sortRating, sortRelease }) {
  const [games, setGames] = useState(initialGames);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      console.log('Have scrolled to the end');
      loadMoreGames();
    }
  }, [inView]);

  let processedGames = games;
  const processedPlatforms = platforms.map((platform) => ({
    name: platform.name,
    value: platform.id,
  }));

  if (sortRating === 'ASC' || sortRating === 'DSC') {
    processedGames = processedGames.sort((a, b) =>
      sortRating === 'ASC' ? a.rating - b.rating : b.rating - a.rating
    );
  }

  if (sortRelease === 'ASC' || sortRelease === 'DSC') {
    processedGames = sortByDate(processedGames, sortRelease);
  }

  const loadMoreGames = async () => {
    await delay(1500);
    const nextPage = pagesLoaded + 1;
    //const nextPage = (pagesLoaded % 10) + 1; // infinite in 10 pages
    const newGames = (await fetchGames(nextPage)) ?? [];
    setGames((prev) => [...prev, ...newGames]);
    setPagesLoaded(nextPage);
  };

  const handlePlatformSelect = async (platformId) => {
    console.log('handlePlatformSelect ', platformId);
    const games = await fetchGames({ platforms: platformId });
    console.log({ games });
    setGames(games);
  };

  return (
    <>
      <Link href='/?sortRating=ASC'>Rating ⬆️</Link>
      <Link href='/?sortRating=DSC'>Rating ⬇️</Link>
      <StyledLink href='/?sortRelease=ASC'> Release ⬆️</StyledLink>
      <StyledLink href='/?sortRelease=DSC'> Release ⬇️</StyledLink>
      <CustomDropdown
        filterItem='platform'
        options={processedPlatforms}
        onSelect={handlePlatformSelect}
      />
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
