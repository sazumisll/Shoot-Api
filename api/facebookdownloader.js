const fs = require('fs');
const axios = require('axios');

// Fungsi untuk mengambil data dari API facebook downloader
const getFacebookDownloadLink = async (apiKey, url) => {
  try {
    const apiUrl = `https://api.lolhuman.xyz/api/facebook?apikey=${apiKey}&url=${url}`;
    const response = await axios.get(apiUrl);
    const result = response.data.result;

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from Facebook downloader API');
  }
}

// Fungsi untuk mendownload file dari URL
const downloadFile = async (url, path) => {
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

module.exports = {
  getFacebookDownloadLink,
  downloadFile
};