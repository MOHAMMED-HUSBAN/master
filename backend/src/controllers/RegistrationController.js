const Registration = require('../models/Registration');
const Program = require('../models/Program');

exports.createRegistration = async (req, res) => {
  console.log('Registration request received');
  console.log('Request body:', req.body);
  console.log('User object:', req.user);

  // Destructure registration data from the request body
  const { name, email, phone, programId } = req.body;

  // Check if the user is authenticated
  let userId;
  if (req.user && req.user.id) {
    userId = req.user.id;
  } else {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Validate input data
  if (!name || !email || !phone || !programId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Create a new registration entry
    const newRegistration = new Registration({
      userId,
      name,
      email,
      phone,
      program: programId,
    });

    // Save the registration to the database
    const savedRegistration = await newRegistration.save();

    // Log success
    console.log('Registration saved successfully:', savedRegistration);

    // Respond with the saved registration data
    return res.status(201).json(savedRegistration);
  } catch (error) {
    console.error('Error during registration:', error.message); // Log the error
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
