require('dotenv').config();

const express = require('express');
const axios = require('axios');
const namarandomApi = require('./api/namarandom');
const simiApi = require('./api/simi');
const coronaglobalApi = require('./api/coronaglobal');
const kumparanApi = require('./api/kumparan');
const facebookDownloaderApi = require('./api/facebookdownloader');
const bucinApi = require('./api/bucin');
const openaiApi = require('./api/openai');
const animeApi = require('./api/anime');
const { getCeritaHoror } = require('./api/ceritahoror');

const app = express();

// Middleware untuk pengecekan API key yang diberikan oleh pengguna
const checkApiKey = (req, res, next) => {
  const { apiKey } = req.params;

  // Cek apakah API key yang diberikan oleh pengguna valid
  if (apiKey !== process.env.API_KEY) {
    res.status(404).json({
      status: 404,
      message: `apikey ${apiKey} not found.`,
      result: 'error'
    });
  } else {
    next();
  }
};

// Route untuk API namarandom
app.get('/api/namarandom/:apiKey', checkApiKey, async (req, res) => {
  try {
    const result = await namarandomApi.getRandomName();

    // Format hasil dari API namarandom ke dalam objek JSON
    const jsonResponse = {
      status: 200,
      developer: 'Sazumi Viki',
      message: 'Success',
      result: result
    };

    // Kirim objek JSON sebagai respon dari route
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API simi
app.get('/api/simi', async (req, res) => {
  const { text } = req.query;

  try {
    const result = await simiApi.getSimiResponse(text);

    // Format hasil dari API simi ke dalam objek JSON
    const jsonResponse = {
      status: 200,
      developer: 'Sazumi Viki',
      message: 'Success',
      result: result
    };

    // Kirim objek JSON sebagai respon dari route
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route untuk API coronaglobal
app.get('/api/coronaglobal', async (req, res) => {
  try {
    const data = await coronaglobalApi.getGlobalCovidData();

    // Format hasil dari API coronaglobal ke dalam objek JSON
    const jsonResponse = {
      status: 200,
      developer: 'Sazumi Viki',
      message: 'Success',
      result: data
    };

    // Kirim objek JSON sebagai respon dari route
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API kumparan
app.get('/api/kumparan/:apiKey', checkApiKey, async (req, res) => {
  const { apiKey } = req.params;

  try {
    const result = await kumparanApi.getKumparanData(apiKey);

    // Format hasil dari API kumparan ke dalam objek JSON
    const jsonResponse = {
      status: 200,
      message: 'success',
      result: result
    };

    // Kirim objek JSON sebagai respon dari route
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API Facebook downloader
app.get('/api/fbdownload/:apiKey', checkApiKey, async (req, res) => {
  const { apiKey } = req.params;
  const { url } = req.query;

  try {
    const result = await facebookDownloaderApi.getFacebookDownloadLink(apiKey, url);

    // Ambil link download video dari hasil API Facebook downloader
    const videoLink = result[0];

    // Tentukan nama file video dan path penyimpanan video
    const videoName = `${Date.now()}.mp4`;
    const videoPath = path.join(__dirname, 'videos', videoName);

    // Download video dari link yang diberikan dan simpan ke dalam server
    await facebookDownloaderApi.downloadFile(videoLink, videoPath);

    // Kirim path video sebagai respon dari route
    res.json({
      status: 200,
      message: 'success',
      result: `http://localhost:3000/videos/${videoName}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API bucindata
app.get('/api/bucin', async (req, res) => {
  try {
    const result = await bucinApi.getBucinData();

    // Kirim objek JSON sebagai respon dari route
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API OpenAI
app.get('/api/openai/:text', async (req, res) => {
  const text = req.params.text;

  try {
    const result = await openaiApi.getOpenaiData(text);

    // Kirim objek JSON sebagai respon dari route
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk API anime
app.get('/api/anime/:name', async (req, res) => {
  const animeName = req.params.name;

  try {
    const result = await animeApi.getAnimeData(animeName);

    // Kirim objek JSON sebagai respon dari route
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengambil cerita horor
app.get('/api/ceritahoror', async (req, res) => {
  try {
    const data = await getCeritaHoror();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return app(request)
}
