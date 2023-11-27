import Greeting from '@/components/Greeting';
import { Games } from '@/components/containers/Games/Games';
import { fetchGames } from '@/actions/fetchGames';
import { fetchPlatforms } from '@/actions/fetchPlatforms';

export default async function Home({ searchParams }) {
  const { sortRating, sortRelease } = searchParams;

  const initialGamesData = await fetchGames();
  const platforms = await fetchPlatforms();

  return (
    <main>
      <Greeting>RAWG Games</Greeting>
      <Games
        sortRating={sortRating}
        sortRelease={sortRelease}
        initialGames={initialGamesData}
        platforms={platforms}
      />
    </main>
  );
}
