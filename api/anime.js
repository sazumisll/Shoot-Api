const axios = require('axios');

const API_BASE_URL = 'https://api.lolhuman.xyz/api';
const API_KEY = 'ayakaviki';

const getAnimeData = async (animeName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/anime?apikey=${API_KEY}&query=${encodeURIComponent(animeName)}`);
    const data = response.data.result;

    const jsonResponse = {
        status: 200,
        message: 'success',
        result: {
          id: data.id,
          idMal: data.idMal,
          title: {
            romaji: data.title.romaji,
            english: data.title.english,
            native: data.title.native
          },
          coverImage: {
            large: data.coverImage.large,
            medium: data.coverImage.medium
          },
          format: data.format,
          episodes: data.episodes,
          duration: data.duration,
          status: data.status,
          season: data.season,
          seasonYear: data.seasonYear,
          source: data.source,
          genres: data.genres,
          startDate: {
            year: data.startDate.year,
            month: data.startDate.month,
            day: data.startDate.day
          },
          endDate: {
            year: data.endDate.year,
            month: data.endDate.month,
            day: data.endDate.day
          },
          description: data.description,
          averageScore: data.averageScore,
          synonyms: data.synonyms
        }
      };
    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from API');
  }
};

module.exports = {
  getAnimeData
};