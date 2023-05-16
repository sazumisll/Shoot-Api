const axios = require('axios');

const API_BASE_URL = 'https://api.openai.com/v1';

// Fungsi untuk mengambil hasil dari OpenAI API menggunakan teks yang diberikan
const getOpenaiData = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/engines/davinci-codex/completions`, {
      prompt: text,
      max_tokens: 100,
      n: 1,
      stop: '\n',
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      }
    });

    const result = response.data.choices[0].text.trim();

    const jsonResponse = {
      status: 200,
      developer: 'Sazumi Viki',
      message: 'Success',
      result: result
    };

    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from OpenAI API');
  }
};

module.exports = {
  getOpenaiData
};