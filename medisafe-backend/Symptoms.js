const mongoose = require('mongoose');

const SymptomsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  illness: { type: [String], required: true }
});

module.exports = mongoose.model('Symptoms', SymptomsSchema);
