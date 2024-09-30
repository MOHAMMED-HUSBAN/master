const Offering = require('../models/Offering');

// Get all offerings
const getOfferings = async (req, res) => {
  try {
    const offerings = await Offering.find();
    res.status(200).json(offerings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new offering
const createOffering = async (req, res) => {
  const { title, description, icon } = req.body;
  const offering = new Offering({ title, description, icon });

  try {
    const savedOffering = await offering.save();
    res.status(201).json(savedOffering);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOfferings,
  createOffering,
};
