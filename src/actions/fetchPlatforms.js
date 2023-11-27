'use server';
const API_URL = process.env.RAWG_API_URL;
const API_KEY = process.env.RAWG_API_KEY;

export async function fetchPlatforms() {
  const platformsURL = `${API_URL}/platforms?key=${API_KEY}`;
  try {
    const response = await fetch(platformsURL);
    const data = await response.json();
    const platforms = data.results.map((platform) => ({
      name: platform.name,
      id: platform.id,
    }));
    return platforms;
  } catch (error) {
    console.error('Erorr fetching Platforms: ', error);
    return null;
  }
}
