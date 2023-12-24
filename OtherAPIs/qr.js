// OtherAPIs/qr_log.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment-timezone');
const qr = require('qr-image');

let qrCounter = 1;

// Lưu counter hiện tại vào tệp
function saveCounter() {
  fs.writeFileSync('qr_counter.txt', qrCounter.toString());
}

// Đọc counter từ tệp (nếu có)
if (fs.existsSync('qr_counter.txt')) {
  qrCounter = parseInt(fs.readFileSync('qr_counter.txt', 'utf-8'));
}

router.get('/qr', (req, res) => {
  const text = req.query.text;
  const currentCounter = qrCounter;

  if (!text) {
    res.status(400).json({ error: 'Missing required parameter: text' });
    return;
  }

  try {
    const qrStream = qr.image(text, { type: 'png' });

    // Ghi nhật ký vào tệp LogsGetsAPIs/OtherAPIs/qr_log.txt
    const logEntry = {
      Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      Text: text,
    };

    const logString = JSON.stringify(logEntry, null, 2);
    fs.appendFile('LogsGetsAPIs/OtherAPIs/qr.txt', logString + ',\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    res.setHeader('Content-Type', 'image/png');
    qrStream.pipe(res);

    qrCounter++;
    saveCounter();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
