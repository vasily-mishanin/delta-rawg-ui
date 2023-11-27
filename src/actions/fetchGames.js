'use server';
const API_URL = process.env.RAWG_API_URL;
const API_KEY = process.env.RAWG_API_KEY;

export async function fetchGames(options = {}) {
  const { page = 1, page_size = 10, platforms, gameName } = options;
  let gamesURL = `${API_URL}/games?key=${API_KEY}&page_size=${page_size}&page=${page}`;

  if (platforms) {
    gamesURL += `&platforms=${platforms}`;
  }

  if (gameName) {
    gamesURL += `&search=${encodeURIComponent(gameName)}`;
  }

  console.log({ gamesURL });

  try {
    const response = await fetch(gamesURL); // { cache: 'no-cache' }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const gamesData = data.results.map((game) => {
      return {
        id: game.id,
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
        platforms: game.platforms.map((p) => p.platform.name),
        short_screenshots: game.short_screenshots,
      };
    });
    return gamesData;
  } catch (error) {
    console.error('Error fetching Games ', error);
    return null;
  }
}
