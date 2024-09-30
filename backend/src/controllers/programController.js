const Program = require('../models/programModel');

// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err });
  }
};

// Create a new program
// exports.createProgram = async (req, res) => {
//   const { title, description } = req.body;

//   try {
//     const newProgram = new Program({ title, description });
//     await newProgram.save();
//     res.status(201).json(newProgram);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating program', error: err });
//   }
// };

// // Delete a program by ID
// exports.deleteProgram = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedProgram = await Program.findByIdAndDelete(id);
//     if (!deletedProgram) {
//       return res.status(404).json({ message: 'Program not found' });
//     }
//     res.status(200).json({ message: 'Program deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting program', error: err });
//   }
// };
