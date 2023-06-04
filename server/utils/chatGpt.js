const fetch = require('node-fetch');
require('dotenv').config({path: '../.env'})

// You will need your API key from OpenAI
const OPENAI_API_KEY = process.env.CHATKEY;
console.log(process.env.CHATKEY)

const askGPT = async (prompt) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        max_tokens: 250,
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Teacher who cares about students'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      const question = {
        title: prompt,
        answer: data.choices[0].message.content.trim(),
      };
      return question;
    } else {
      throw new Error('Invalid response from the OpenAI API.');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch data from the OpenAI API.');
  }
};

module.exports = { askGPT };
