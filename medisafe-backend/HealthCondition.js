const mongoose = require('mongoose');

const HealthConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  symptoms: { type: [String], required: true },
  causes: { type: [String], required: true },
  prevention: { type: [String], required: true }
});

module.exports = mongoose.model('HealthCondition', HealthConditionSchema);
