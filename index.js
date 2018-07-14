const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const BASE_API_URL = '/api/v1';
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/timetrackerDB';
const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);
const resources = require('./src/resources');

bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

app.use(`${BASE_API_URL}/timelogs`, resources.timelog.router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      require('path').resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log('Backend App running on port:', PORT);
});
