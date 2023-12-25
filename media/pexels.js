const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');

function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', async (req, res) => {
  const imgParam = req.query.img;

  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${imgParam}&per_page=3`, {
      headers: {
        Authorization: 'xX2KgxF3E0UTIeUq7DJf5kUDHRdMRvkwht19ovBFK1rte4LxQGzE4HTP' 
      }
    });

    const photos = response.data.photos;

    const imageLinks = photos.map(photo => photo.src.original);

    const randomIndexes = Array.from({ length: 3 }, () => getRandomIndex(imageLinks));
    const randomImages = randomIndexes.map(index => imageLinks[index]);

    const result = {
      img: randomImages[0],
      img1: randomImages[1],
      img2: randomImages[2],
      keyword: imgParam
    };

    const log = {
      Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      KEYWORD: result['keyword'],
    };

    const logString = JSON.stringify(log, null, 2);
    fs.appendFile('LogsGetsAPIs/media/pexels.txt', logString + ',\n', (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json(result); 
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
