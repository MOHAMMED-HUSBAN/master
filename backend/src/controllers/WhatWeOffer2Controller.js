// src/controllers/programController.js
const WhatWeOffer2 = require('../models/WhatWeOffer2');

exports.getWhatWeOffer2 = async (req, res) => {
    try {
      const programs = await WhatWeOffer2.find(); // Change this variable name
      res.json(programs); // Ensure this returns an array
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Create a new program
exports.createWhatWeOffer2 = async (req, res) => {
  const { name, description, price, image } = req.body;
  const newWhatWeOffer2 = new WhatWeOffer2({ name, description, price, image });

  try {
    const savedWhatWeOffer2 = await newWhatWeOffer2.save();
    res.status(201).json(savedWhatWeOffer2);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
