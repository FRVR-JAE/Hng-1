const express = require('express');
const moment = require('moment-timezone');
const https = require('https');

const app = express();
const port = process.env.PORT || 3000;

app.get('/info', async (req, res) => {
  try {
    const slackName = req.query.slackName || 'Tj Oloyede';
    const track = req.query.track || 'Backend';

    // Get current day of the week and UTC time
    const currentDayOfWeek = moment().format('dddd');
    const currentUtcTime = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    const utcOffset = moment().utcOffset();

    // GitHub URLs
    const githubURL = 'https://github.com/FRVR-JAE/Hng-1';
    const githubFileURL = `${githubURL}/blob/main/app.js`;

    // Fetch the full source code from the GitHub repository
    https.get(`${githubURL}/archive/main.zip`, (response) => {
      if (response.statusCode === 200) {
        // Status Code of Success
        res.status(200).json({
          slackName,
          currentDayOfWeek,
          currentUtcTime,
          utcOffset, // Include the UTC offset in the response
          track,
          githubFileURL,
          githubURL,
          statusCode: 'Success',
        });
      } else if (response.statusCode === 302) {
        // Follow the redirection to the new URL
        const redirectedURL = response.headers.location;
        https.get(redirectedURL, (newResponse) => {
          if (newResponse.statusCode === 200) {
            // Status Code of Success
            res.status(200).json({
              slackName,
              currentDayOfWeek,
              currentUtcTime,
              utcOffset, // Include the UTC offset in the response
              track,
              githubFileURL: redirectedURL, // Use the new URL
              githubURL,
              statusCode: 'Success',
            });
          } else {
            console.error(`GitHub request failed with status code: ${newResponse.statusCode}`);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }).on('error', (error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      } else {
        console.error(`GitHub request failed with status code: ${response.statusCode}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


