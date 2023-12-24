const express = require('express');
const axios = require('axios');
const isReachable = require('is-reachable');
const fs = require('fs');
const moment = require('moment-timezone');
const router = express.Router();

// UptimeRobot API Key
const API_KEY = 'u2044425-fd1ada876126cdff8d77e554';

router.get('/create', async (req, res) => {
  const dashboardUrl = req.query.dashboardUrl || '';

  // Kiểm tra tính trạng của URL
  const isUrlReachable = await isReachable(dashboardUrl);

  let response = {
    success: false,
    message: {
      en: 'Error creating UptimeRobot monitor.',
      vi: 'Lỗi khi tạo báo động UptimeRobot.',
      ar: 'خطأ في إنشاء جهاز مراقبة UptimeRobot.',
    },
		dbd: '',
  };

  if (isUrlReachable) {
    try {
      const createMonitorResponse = await axios.post(
        'https://api.uptimerobot.com/v2/newMonitor',
        {
          apiKey: API_KEY,
          monitorFriendlyName: 'My Uptime Monitor',
          monitorURL: dashboardUrl,
          monitorType: 1, // HTTP(s)
        }
      );

      response = {
        success: true,
        message: {
          en: 'UptimeRobot monitor created successfully.',
          vi: 'Đã tạo thành công dashboard UptimeRobot.',
          ar: 'تم إنشاء جهاز مراقبة UptimeRobot بنجاح.',
        },
        dbd: createMonitorResponse.data.monitorURL,
      };
    } catch (error) {
      // Do nothing here, response remains the same
    }
  }

  // Ghi nhật ký vào tệp logs/uptime.txt
  const logEntry = {
    url: dashboardUrl,
    Time: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    Status: response.success ? 'Success' : 'Error',
    Other: response.message.vi,
  };

  const logString = JSON.stringify(logEntry, null, 2); // Thêm tham số null, 2 để format JSON xuống dòng và thụt lề
  fs.appendFile('LogsGetsAPIs/uptimerobot/CreateUptime.txt', logString + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  res.json(response);
});

module.exports = router;
