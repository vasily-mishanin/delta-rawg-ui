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
      const { id, name, background_image, rating, released, platforms } = game;
      return {
        id,
        name,
        background_image,
        rating,
        released,
        platforms: platforms.map((p) => p.platform.name),
      };
    });
    return gamesData;
  } catch (error) {
    console.error('Error fetching Games ', error);
    return null;
  }
}
