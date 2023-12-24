const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');

// Define the log file path
const logFilePath = 'LogsGetsAPIs/OtherAPIs/gpt.txt';

// Retrieve your OpenAI API key from secrets (replace with your actual key)
const openaiApiKey = process.env.OPENAI_API_KEY;

router.get('/ask', async (req, res) => {
  const { gpt, pass } = req.query;

  if (!gpt || !pass || pass !== 'huynhletanphat') {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  try {
    const apiKey = openaiApiKey;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: gpt },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const gptResponse = response.data.choices[0].message.content;

    // Log the request to the log file
    logRequest(gpt, apiKey, gptResponse);

    res.json({ answer_codebytanphat: gptResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Function to log the request
function logRequest(gpt, apiKey, gptResponse) {
  const logEntry = {
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    GPTInput: gpt,
    APIKey: apiKey,
    GPTResponse: gptResponse,
  };

  const logString = JSON.stringify(logEntry, null, 2);

  fs.appendFile(logFilePath, logString + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = router;
