const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  nameSelector: String,
}, {timestamps: true});

mongoose.model('Config', ConfigSchema);

module.exports = mongoose.model('Config');
