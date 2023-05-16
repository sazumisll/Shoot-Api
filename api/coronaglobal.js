const axios = require('axios');

const getGlobalCovidData = async () => {
  try {
    const response = await axios.get(
      `https://api.lolhuman.xyz/api/corona/global?apikey=${process.env.API_KEY}`
    );

    const data = response.data.result;

    return {
      positif: data.positif,
      meninggal: data.meninggal,
      sembuh: data.sembuh,
      dirawat: data.dirawat
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get global COVID-19 data');
  }
};

module.exports = {
  getGlobalCovidData
};