const axios = require('axios');

const API_BASE_URL = 'https://api.lolhuman.xyz/api';
const API_KEY = 'ayakaviki';

const getCeritaHoror = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ceritahoror?apikey=${API_KEY}`);
    const data = response.data.result;

    const jsonResponse = {
      status: 200,
      message: 'success',
      result: {
        title: data.title,
        thumbnail: data.thumbnail,
        description: data.desc,
        story: data.story
      }
    };

    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from API');
  }
};

module.exports = {
  getCeritaHoror
};