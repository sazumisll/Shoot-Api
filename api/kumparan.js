const axios = require('axios');

const API_BASE_URL = 'https://api.lolhuman.xyz/api';

// Fungsi untuk mengambil data dari API kumparan
const getKumparanData = async (apiKey) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/kumparan?apikey=${apiKey}`);
    const result = response.data.result;

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from API kumparan');
  }
}

module.exports = {
  getKumparanData
};