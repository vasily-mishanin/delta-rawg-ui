'use server';
const baseURL = process.env.RAWG_API_URL;
const apiKey = process.env.RAWG_API_KEY;

const PAGE_SIZE = 10;

export async function getGames(page = 1) {
  const gamesURL = `${baseURL}/games?key=${apiKey}&page_size=${PAGE_SIZE}&page=${page}`;
  try {
    const response = await fetch(gamesURL); // { cache: 'no-cache' }
    const data = await response.json();
    const gamesData = data.results.map((game) => {
      const { id, name, background_image, rating, released } = game;
      return { id, name, background_image, rating, released };
    });
    return gamesData;
  } catch (error) {
    console.error('Error getting games ', error);
    return null;
  }
}
