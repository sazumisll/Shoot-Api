const axios = require('axios');

const getSimiResponse = async (text) => {
  try {
    const response = await axios.get(
      `https://api.lolhuman.xyz/api/simi?apikey=${process.env.API_KEY}&text=${encodeURIComponent(
        text
      )}&badword=true`
    );

    const result = response.data.result;

    return {
      text: result,
      link: `https://api.lolhuman.xyz/api/simi?apikey=${process.env.API_KEY}&text=${encodeURIComponent(
        text
      )}&badword=true`
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get simi response');
  }
};

module.exports = {
  getSimiResponse
};