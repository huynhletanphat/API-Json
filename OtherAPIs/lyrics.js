// OtherAPIs/lyrics.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');

const DEFAULT_LANGUAGE = 'en';

router.get('/lyrics', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    res.status(400).json({ error: 'Missing required parameter: query' });
    return;
  }

  const [artist, songTitle] = query.split(',').map(item => item.trim());

  try {
    const response = await axios.get(`https://musixmatch-song-lyrics-api.p.rapidapi.com/getLyrics?artist=${artist}&song=${songTitle}`, {
      headers: {
        'X-RapidAPI-Key': '478881cb70msh754fcfd4d1dbf09p157d6ejsn6a242ca507a1',
        'X-RapidAPI-Host': 'musixmatch-song-lyrics-api.p.rapidapi.com'
      }
    });

    const lyrics = response.data.lyrics;

    // Ghi nhật ký vào tệp LogsGetsAPIs/OtherAPIs/lyrics_log.txt
    const logEntry = {
      Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      Artist: artist,
      Title: songTitle,
    };

    const logString = JSON.stringify(logEntry, null, 2);
    fs.appendFile('LogsGetsAPIs/OtherAPIs/lyrics.txt', logString + ',\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    const responseJSON = {
      lyrics: lyrics,
      rsl_for: response.data[DEFAULT_LANGUAGE],
    };

    res.json(responseJSON);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
