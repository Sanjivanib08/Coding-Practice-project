const mongoose = require('mongoose');

// Define the Bundle schema
const bundleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  createdAt: { type: Date, default: Date.now }
});

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = Bundle;
