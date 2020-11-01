const mongoose = require('mongoose');

const Exam = new mongoose.Schema({
  examId: String,
  name: String,
  startAt: Number,
  endAt: Number,
  captureConfig: {},
  captureRate: {},
});
mongoose.model('Exam', Exam);

module.exports = mongoose.model('Exam');
