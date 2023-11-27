'use server';
const API_URL = process.env.RAWG_API_URL;
const API_KEY = process.env.RAWG_API_KEY;

export async function fetchGameScreenshots(id) {
  try {
    if (!id) {
      console.error('Provide game Id or Slug to get the game');
      throw new Error('Provide game Id or Slug to get the game');
    }
    const gameURL = `${API_URL}/games/${id}/screenshots?key=${API_KEY}`;
    const response = await fetch(gameURL);
    const data = await response.json();
    const screenshots = data.results.map((result) => result.image);
    return screenshots;
  } catch (error) {
    console.error('Error fetching screenshots: ', error);
    return null;
  }
}
