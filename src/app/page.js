import Greeting from '@/components/Greeting';
//import StyledComponentsRegistry from './lib/registry';
//import { GameCard } from '@/components/GameCard/GameCard';
import GamesList from '@/components/GamesList/GamesList';
import { fetchGames } from '@/actions/fetchGames';
import { fetchPlatforms } from '@/actions/fetchPlatforms';

// async function getGames() {
//   console.log('GET GAMES');
//   const gamesURL = `${process.env.RAWG_API_URL}/games?key=${process.env.RAWG_API_KEY}`;
//   const response = await fetch(gamesURL);
//   const data = await response.json();
//   const gamesData = data.results.map((game) => {
//     const { id, name, background_image, rating, released } = game;
//     return { id, name, background_image, rating, released };
//   });
//   return gamesData;
// }

export default async function Home({ searchParams }) {
  const { sortRating, sortRelease } = searchParams;

  const initialGamesData = await fetchGames();
  const platforms = await fetchPlatforms();

  return (
    <main>
      {/* <StyledComponentsRegistry> */}
      <Greeting>RAWG Games</Greeting>
      <GamesList
        sortRating={sortRating}
        sortRelease={sortRelease}
        initialGames={initialGamesData}
        platforms={platforms}
      />
      {/* </StyledComponentsRegistry> */}
    </main>
  );
}
