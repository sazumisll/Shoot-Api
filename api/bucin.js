const axios = require('axios');

const getBucinData = async () => {
  try {
    const response = await axios.get(`https://api.lolhuman.xyz/api/random/bucin?apikey=ayakaviki`);
    const data = response.data.result;

    const jsonResponse = {
      status: response.data.status,
      developer: 'Sazumi Viki',
      message: response.data.message,
      result: data
    };

    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from API');
  }
};

module.exports = {
  getBucinData
};