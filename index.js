const express = require('express');
const app = express();
const fs = require('fs');
const moment = require('moment-timezone');

const logRouterAccess = (req, res, next) => {
  const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  const url = req.originalUrl;

  const logEntry = `
---------------------------
Time: ${currentTime}
Connect Router: ${url}
---------------------------
`;
  console.log(logEntry);
  next();
};

const Memenhanvan = require('./memes/memenhanvan');
const Memetypical = require('./memes/memetypical');
const Memelord = require('./memes/memelord');
const Memedark = require('./memes/memedark');
const QRCode = require('./OtherAPIs/qr');
const lyricsRoute = require('./OtherAPIs/lyrics');
const pexelsRouter = require('./media/pexels');

app.use('/OtherAPIs', logRouterAccess, lyricsRoute);
app.use('/meme', logRouterAccess, Memenhanvan);
app.use('/meme', logRouterAccess, Memedark);
app.use('/meme', logRouterAccess, Memetypical);
app.use('/meme', logRouterAccess, Memelord);
app.use('/OtherAPIs', logRouterAccess, QRCode);
app.use('/media/pexels', logRouterAccess, pexelsRouter);

app.listen(3000, () => {
  console.log(`done`);
});
