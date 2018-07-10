const mongoose = require('mongoose');

const TimelogSchema = new mongoose.Schema({
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  description: { type: String, default: '' },
  timezoneOffset: { type: Number, default: new Date().getTimezoneOffset() }
});

module.exports = mongoose.model('Timelog', TimelogSchema);
