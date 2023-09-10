const express = require('express');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 2000;

app.get('/api', (req, res) => {
  try {
    // Get query parameters
    const slackName = req.query.slack_name || 'tj_oloyede';
    const track = req.query.track || 'backend';

    // Get current day of the week
    const currentDayOfWeek = moment().format('dddd');

    // Get current UTC time formatted as specified
    const currentUtcTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

    // GitHub URLs
    const githubFileURL = 'hhttps://github.com/FRVR-JAE/Hng-1/main/app.js';
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




