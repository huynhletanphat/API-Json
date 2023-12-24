const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');


function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/dark', (req, res) => {
     const memes = [
    'https://i.ibb.co/j6zmHSD/xva213.jpg',
    'https://i.ibb.co/dk2s6jy/xva213.jpg',
    'https://i.ibb.co/PTv5d4N/xva213.jpg',
    'https://i.ibb.co/kD6Rh3z/xva213.jpg',
    'https://i.ibb.co/n0zCnj2/xva213.jpg',
    'https://i.ibb.co/4pd89tN/xva213.jpg',
    'https://i.ibb.co/PGJqy57/xva213.jpg',
    'https://i.ibb.co/WWmCZJk/xva213.jpg',
    'https://i.ibb.co/RhXm2cv/xva213.jpg',
    'https://i.ibb.co/WWJh6xv/xva213.jpg',
    'https://i.ibb.co/wJs7JJp/xva213.jpg',
    'https://i.ibb.co/yVd0Jh6/xva213.jpg',
    'https://i.ibb.co/1MrW1pV/xva213.jpg',
    'https://i.ibb.co/HPN1wDQ/xva213.jpg',
    'https://i.ibb.co/mBPtpfc/xva213.jpg',
    'https://i.ibb.co/tXcy0vr/xva213.jpg',
    'https://i.ibb.co/yfwDVWG/xva213.jpg',
    'https://i.ibb.co/gVBJRqR/xva213.jpg',
  ];
	
  const randomIndex = getRandomIndex(memes);
  const randomMeme = memes[randomIndex];
  

  const logEntry = {
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    URL: randomMeme,
  };
  
  const logString = JSON.stringify(logEntry, null, 2);
  fs.appendFile('LogsGetsAPIs/memeslogs/dark.txt', logString + ',\n', (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.json({ "url": randomMeme });
});

module.exports = router;