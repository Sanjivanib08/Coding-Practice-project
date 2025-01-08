const Bundle = require('../models/bundle');

// Create a new bundle
exports.createBundle = async (req, res) => {
  try {
    const { name, description, problems } = req.body;
    const bundle = new Bundle({ name, description, problems });
    await bundle.save();
    res.status(201).json(bundle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bundles
exports.getAllBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find().populate('problems');
    res.json(bundles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
