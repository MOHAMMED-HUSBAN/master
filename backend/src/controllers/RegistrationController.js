// src/controllers/RegistrationController.js
const Registration = require('../models/Registration');

// Create a new registration
exports.createRegistration = async (req, res) => {
  const { name, email, phone, program } = req.body;
  const existingRegistration = await Registration.findOne({ $or: [{ email }, { phone }, { name }] });
  if (existingRegistration) {
    return res.status(400).json({ message: 'Registration already exists.' });
  }


  const newRegistration = new Registration({ name, email, phone, program });

  try {
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
