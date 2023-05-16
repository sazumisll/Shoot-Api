require('dotenv').config();

const axios = require('axios');

const getRandomName = async () => {
  try {
    const response = await axios.get(
      `https://api.lolhuman.xyz/api/random/nama?apikey=${process.env.API_KEY}`
    );

    const result = response.data.result;
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get random name');
  }
};

module.exports = {
  getRandomName
};