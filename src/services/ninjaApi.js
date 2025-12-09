import axios from 'axios';

const API_KEY = 'cCmYN5pwoDwuQyDKJRH98w==bw8PED6utKjfvPyp'; // Replace with your actual Ninja API key
const BASE_URL = 'https://api.api-ninjas.com/v1';

const ninjaApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const fetchNutritionData = async (query) => {
  try {
    const response = await ninjaApi.get(`/nutrition?query=${encodeURIComponent(query)}`);
    console.log('Nutrition API Response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRecentSearches = async () => {
  return [];
};

export default ninjaApi;