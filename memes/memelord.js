const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');


function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/lord', (req, res) => {
     const memes = [
    'https://i.ibb.co/S6dnLgq/xva213.jpg',
    'https://i.ibb.co/94fpW3X/xva213.jpg',
    'https://i.ibb.co/94fpW3X/xva213.jpg',
    'https://i.ibb.co/ZTs4H3X/xva213.jpg',
    'https://i.ibb.co/tpCtpWC/xva213.jpg',
    'https://i.ibb.co/dtnDT5V/xva213.jpg',
    'https://i.ibb.co/6RvZKx8/xva213.jpg',
    'https://i.ibb.co/fXgb6gY/xva213.jpg',
    'https://i.ibb.co/GkmZdKs/xva213.jpg',
    'https://i.ibb.co/7nf3Znz/xva213.jpg',
    'https://i.ibb.co/Pj5NF5N/xva213.jpg',
    'https://i.ibb.co/Rb1Wbwv/xva213.jpg',
    'https://i.ibb.co/2jkXLKr/xva213.jpg'
  ];
  const randomIndex = getRandomIndex(memes);
  const randomMeme = memes[randomIndex];

  const logEntry = {
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    URL: randomMeme,
  };
  
  const logString = JSON.stringify(logEntry, null, 2);
  fs.appendFile('LogsGetAPIs/memeslogs/lord.txt', logString + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  res.json({ "url": randomMeme });
});

module.exports = router;
