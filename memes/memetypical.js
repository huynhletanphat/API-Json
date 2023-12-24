const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');


function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/typical', (req, res) => {
     const memes = [
    'https://i.ibb.co/TR4hvWr/xva213.jpg',
    'https://i.ibb.co/s6gCdLv/xva213.jpg',
    'https://i.ibb.co/3sjSW7X/xva213.jpg',
    'https://i.ibb.co/TRd1Swt/xva213.jpg',
    'https://i.ibb.co/h1sfksd/xva213.jpg',
    'https://i.ibb.co/VwCyPqm/xva213.jpg',
    'https://i.ibb.co/vLc5DCF/xva213.jpg',
    'https://i.ibb.co/4Rwx7PT/xva213.jpg',
    'https://i.ibb.co/6Rkfbst/xva213.jpg',
    'https://i.ibb.co/DgKzhPV/xva213.jpg'
  ];
  const randomIndex = getRandomIndex(memes);
  const randomMeme = memes[randomIndex];
  

  const logEntry = {
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    URL: randomMeme,
  };
  
  const logString = JSON.stringify(logEntry, null, 2);
  fs.appendFile('LogsGetsAPIs/memeslogs/typical.txt', logString + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  res.json({ "url": randomMeme });
});

module.exports = router;
