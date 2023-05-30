const fetch = require('node-fetch');

// You will need your API key from OpenAI
const OPENAI_API_KEY = 'your-api-key-here';

const askGPT = async (prompt) => {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100
      })
    });

    const data = await response.json();
    return data.choices[0].text.trim(); // Extract the generated text

  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch data from the OpenAI API.');
  }
};

module.exports = { askGPT };
