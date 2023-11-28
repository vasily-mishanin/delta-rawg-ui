'use server';
const API_URL = process.env.RAWG_API_URL;
const API_KEY = process.env.RAWG_API_KEY;

export async function fetchOneGame(id) {
  try {
    if (!id) {
      console.error('Provide game Id or Slug to get the game');
      throw new Error('Provide game Id or Slug to get the game');
    }
    const gameURL = `${API_URL}/games/${id}?key=${API_KEY}`;
    const response = await fetch(gameURL);

    if (!response.ok) {
      console.error('No game found by this id: ' + id);
      return null;
    }

    const data = await response.json();
    const { name, description_raw, website } = data;
    const game = { name, description: description_raw, website };

    return game;
  } catch (error) {
    console.error('Error fetching game: ', error);
    return null;
  }
}
