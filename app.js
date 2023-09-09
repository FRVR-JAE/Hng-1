const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const user = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

const currentDate = new Date();
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDayIndex = currentDate.getUTCDay();
const currentDayName = dayNames[currentDayIndex];

const current = new Date();
const year = current.getUTCFullYear();
const month = String(current.getUTCMonth() + 1).padStart(2, "0"); // Add 1 to month because it's 0-indexed
const day = String(current.getUTCDate()).padStart(2, "0");
const hours = String(current.getUTCHours()).padStart(2, "0");
const minutes = String(current.getUTCMinutes()).padStart(2, "0");
const seconds = String(current.getUTCSeconds()).padStart(2, "0");

const currentUtcTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
app.get("/api", (req, res) => {
  const utc = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000
  );
  const utc_time = utc.toISOString().split(".")[0] + "Z";
  res.status(200).json({
    slack_name:"Tj oloyede",
    current_day: currentDayName,
    utc_time: utc.toISOString().split(".")[0] + "Z",
    track:"backend",
    github_file_url: user.github_file_url,
    github_repo_url: user.github_repo_url,
    status_code: user.status_code,
  });
});
const port = 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

