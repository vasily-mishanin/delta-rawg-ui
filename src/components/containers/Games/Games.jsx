'use client';
import { useEffect, useState } from 'react';
import { Spinner } from '../../Spinner/Spinner';
import { useInView } from 'react-intersection-observer';
import { fetchGames } from '@/actions/fetchGames';
import { delay } from '@/utils/delay';
import { StyledLink } from '@/components/Greeting';
import Link from 'next/link';
import { sortByDate } from '@/utils/sortByDate';
import { CustomDropdown } from '../../Select/CustomDropdown';
import { SearchInput } from '../../SearchInput/SearchInput';
import { GamesList } from '../../GamesList/GamesList';

export function Games({ initialGames, platforms, sortRating, sortRelease }) {
  const [games, setGames] = useState(initialGames);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [plarformId, setPlatformId] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [noGames, setNoGames] = useState(false);

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
    const newGames = await fetchGames({
      page: nextPage,
      platforms: plarformId,
      gameName,
    });

    if (!newGames) {
      setNoGames(true);
      return;
    }

    setGames((prev) => [...prev, ...newGames]);
    setPagesLoaded(nextPage);
  };

  const handlePlatformSelect = async (id) => {
    console.log('handlePlatformSelect ', id);
    const games = await fetchGames({
      platforms: id,
      gameName,
    });

    if (games) {
      setNoGames(false);
    }

    setGames(games);
    setPlatformId(id);
    setPagesLoaded(1);
  };

  const handleSearch = async (searchQuery) => {
    console.log({ searchQuery });
    if (!searchQuery) {
      setGameName(null);
      return;
    }

    const games = await fetchGames({
      platforms: plarformId,
      gameName: searchQuery,
    });

    if (games) {
      setNoGames(false);
    }

    setGames(games);
    setGameName(searchQuery);
    setPagesLoaded(1);
  };

  return (
    <>
      <Link href='/?sortRating=ASC'>Rating ⬆️</Link>
      <Link href='/?sortRating=DSC'>Rating ⬇️</Link>
      <StyledLink href='/?sortRelease=ASC'> Release ⬆️</StyledLink>
      <StyledLink href='/?sortRelease=DSC'> Release ⬇️</StyledLink>
      <SearchInput placeholder='game name' onSearch={handleSearch} />
      <CustomDropdown
        filterItem='platform'
        options={processedPlatforms}
        onSelect={handlePlatformSelect}
      />
      <GamesList games={processedGames} />
      {noGames && <p>No more games</p>}

      {!noGames && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  );
}
