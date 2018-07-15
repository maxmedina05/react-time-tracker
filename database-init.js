const mongoose = require('mongoose');
const moment = require('moment');
const Timelog = require('./src/resources/timelog/timelog.schema');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/timetrackerDB';

function initializeDatabase() {
  const lastWeek = moment().subtract(4, 'week');
  const arr = [];

  let lastDay = lastWeek;
  for (let i = 0; i < 50; i++) {
    const timelog = new Timelog({
      startTime: lastDay.add(i, 'minutes').toDate(),
      endTime: lastDay.add(i + 30, 'minutes').toDate(),
      description: 'Timelog #' + i
    });

    arr.push(timelog);
  }

  Timelog.insertMany(arr, err => {
    if (err) {
      console.log(err);
    }
    mongoose.disconnect();
  });
}

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true },
  initializeDatabase
);
