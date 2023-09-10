const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  try {
    // Get query parameters
    const slackName = req.query.slack_name || 'TJ_oloyede';
    const track = req.query.track || 'backend';

    // Get current day of the week
    const currentDayOfWeek = moment().format('dddd');

    // Get current UTC time with validation of +/-2 minutes
    const now = moment();
    const isValidUtcTime = now.isBetween(
      now.clone().subtract(2, 'minutes'),
      now.clone().add(2, 'minutes')
    );
    const currentUtcTime = isValidUtcTime
      ? now.toISOString()
      : 'Invalid UTC Offset';

    // GitHub URLs
    const githubFileURL = 'https://github.com/FRVR-JAE/Hng-1/blob/main/app.js';
    const githubRepoURL = 'https://github.com/FRVR-JAE/Hng-1';

    // Response JSON
    const jsonResponse = {
      slack_name: slackName,
      current_day: currentDayOfWeek,
      utc_time: currentUtcTime,
      track: track,
      github_file_url: githubFileURL,
      github_repo_url: githubRepoURL,
      status_code: 200,
    };

    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




