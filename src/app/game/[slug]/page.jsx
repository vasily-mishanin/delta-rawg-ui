import { fetchOneGame } from '@/actions/fetchOneGame';
import { fetchGameScreenshots } from '@/actions/fetchGameScreenshots';
import { Game } from '@/components/Game/Game';
import { notFound } from 'next/navigation';

export default async function GamePage({ params }) {
  const { slug } = params;
  const game = await fetchOneGame(slug);
  const screenshots = (await fetchGameScreenshots(slug)) || [];

  if (!game || !screenshots) {
    return notFound();
  }

  return (
    <main>
      <Game game={game} screenshots={screenshots} />
    </main>
  );
}
