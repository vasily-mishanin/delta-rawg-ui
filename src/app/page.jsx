import Greeting from '@/components/Common';
import { Games } from '@/components/containers/Games/Games';
import { fetchGames } from '@/actions/fetchGames';
import { fetchPlatforms } from '@/actions/fetchPlatforms';
import { notFound } from 'next/navigation';

export default async function Home({ searchParams }) {
  const { sortRating, sortRelease } = searchParams;

  const initialGamesData = await fetchGames();
  const platforms = await fetchPlatforms();

  if (!initialGamesData || !platforms) {
    notFound();
  }

  return (
    <main>
      <Greeting>RAWG Games UI</Greeting>
      <Games
        sortRating={sortRating}
        sortRelease={sortRelease}
        initialGames={initialGamesData}
        platforms={platforms}
      />
    </main>
  );
}
