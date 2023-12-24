const express = require('express');
const app = express();
const fs = require('fs');

const Memenhanvan = require('./memes/memenhanvan');
const Memetypical = require('./memes/memetypical');
const Memelord = require('./memes/memelord');
const Memedark = require('./memes/memedark');
const QRCode = require('./OtherAPIs/qr');
const lyricsRoute = require('./OtherAPIs/lyrics')
const pexelsRouter = require('./media/pexels');;

app.use('/OtherAPIs', lyricsRoute);
app.use('/meme', Memenhanvan);
app.use('/meme', Memedark);
app.use('/meme', Memetypical);
app.use('/meme', Memelord);
app.use('/OtherAPIs', QRCode);
app.use('/media/pexels', pexelsRouter);

app.listen(3000, () => {
  console.log(`done`);
});
