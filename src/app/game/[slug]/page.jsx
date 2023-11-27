import { fetchOneGame } from '@/actions/fetchOneGame';
import { fetchGameScreenshots } from '@/actions/fetchGameScreenshots';
import { Game } from '@/components/Game/Game';

export default async function GamePage({ params }) {
  const { slug } = params;
  const game = await fetchOneGame(slug);
  const screenshots = await fetchGameScreenshots(slug);

  return (
    <main>
      <Game game={game} screenshots={screenshots} />
    </main>
  );
}
