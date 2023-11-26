import Greeting from '@/components/Greeting';
import { StyledLink } from '@/components/Greeting';
//import Image from 'next/image';
import Link from 'next/link';
//import StyledComponentsRegistry from './lib/registry';
//import { GameCard } from '@/components/GameCard/GameCard';
import GamesList from '@/components/GamesList/GamesList';
import { getGames } from '@/actions/getGames';

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

export default async function Home() {
  const initialGamesData = await getGames();

  return (
    <main>
      {/* <StyledComponentsRegistry> */}
      <Greeting>RAWG Games</Greeting>
      <Link href='/game'>Simple Link</Link>
      <StyledLink href='/game'>Styled Link </StyledLink>
      <GamesList initialGames={initialGamesData} />
      {/* </StyledComponentsRegistry> */}
    </main>
  );
}
