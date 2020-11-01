const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  browserTime: Date,
  serverTime: Date,
  examId: String,

});
mongoose.model('Image', ImageSchema);

module.exports = mongoose.model('Image');
