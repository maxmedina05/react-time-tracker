const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const BASE_API_URL = '/api/v1';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/timetrackerDB';
const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect(MONGO_URI);

bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log('App running on port:', PORT);
});
