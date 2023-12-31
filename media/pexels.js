const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');

function getRandomIndexes(maxLength, quantity) {
  const indexes = [];
  while (indexes.length < quantity) {
    const randomIndex = Math.floor(Math.random() * maxLength);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}

router.get('/', async (req, res) => {
  const imgParam = req.query.img;

  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${imgParam}&per_page=9`, {
      headers: {
        Authorization: 'xX2KgxF3E0UTIeUq7DJf5kUDHRdMRvkwht19ovBFK1rte4LxQGzE4HTP'
      }
    });

    const photos = response.data.photos;

    const imageLinks = [...new Set(photos.map(photo => photo.src.original))];

    const randomIndexes = getRandomIndexes(imageLinks.length, 9);
    const randomImages = randomIndexes.map(index => imageLinks[index]);

    const result = {};
    for (let i = 0; i < randomImages.length; i++) {
      result[i === 0 ? 'img' : `img${i}`] = randomImages[i];
    }
    result.keyword = imgParam;

    const logEntry = {
      Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      KEYWORD: result.keyword,
    };

    const logString = JSON.stringify(logEntry, null, 2);
    fs.appendFile('LogsGetsAPIs/media/pexels.txt', logString + ',\n', (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json(result);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error data');
  }
});

module.exports = router;
