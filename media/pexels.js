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
  const imgParam = req.query.img; // Lấy giá trị của tham số 'img' từ URL
  const numberOfImages = 3; // Số lượng hình ảnh cần lấy

  try {
    // Sử dụng giá trị 'img' để gửi yêu cầu tới Pexels API
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${imgParam}&per_page=${numberOfImages}`, {
      headers: {
        Authorization: 'xX2KgxF3E0UTIeUq7DJf5kUDHRdMRvkwht19ovBFK1rte4LxQGzE4HTP' // Thay thế YOUR_API_KEY bằng API key của bạn từ Pexels
      }
    });

    const photos = response.data.photos;

    // Tạo một object JSON mới với cấu trúc mong muốn và keyword
    const result = {
      keyword: imgParam
    };

    for (let i = 0; i < photos.length; i++) {
      result[`img${i + 1}`] = photos[i].src.original;
    }

    // Ghi logs
    const logEntry = {
      Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      KEYWORD: result['keyword'] 
    };

    const logString = JSON.stringify(logEntry, null, 2);
    fs.appendFile('LogsGetsAPIs/media/pexels.txt', logString + ',\n', (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json(result); // Trả về dữ liệu JSON của các hình ảnh từ Pexels API theo cấu trúc mới
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
