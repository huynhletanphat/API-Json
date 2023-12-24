// memes/nhanvan.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');


function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/nhanvan', (req, res) => {
  const memes = [
    'https://i.ibb.co/MP6dXLy/xva213.jpg',
    'https://i.ibb.co/hFn12Mp/xva213.jpg',
    'https://i.ibb.co/vLkG7rJ/xva213.jpg',
    'https://i.ibb.co/Fht4rhz/xva213.jpg',
    'https://i.ibb.co/JtTXWLg/xva213.jpg',
    'https://i.ibb.co/bsFGS2G/xva213.jpg',
    'https://i.ibb.co/Tv5x8zN/xva213.jpg',
    'https://i.ibb.co/c8k1swH/xva213.jpg',
    'https://i.ibb.co/WsggYCJ/xva213.jpg',
    'https://i.ibb.co/MS9ppHB/xva213.jpg'
  ];
  
  const randomIndex = getRandomIndex(memes);
  const randomMeme = memes[randomIndex];
  
  const logEntry = {
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    URL: randomMeme,
  };
  
  const logString = JSON.stringify(logEntry, null, 2);
  fs.appendFile('LogsGetsAPIs/memeslogs/nhanvan.txt', logString + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  res.json({ "url": randomMeme });
});

module.exports = router;
