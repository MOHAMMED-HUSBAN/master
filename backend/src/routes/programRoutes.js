const express = require('express');
const { getPrograms, createProgram, deleteProgram } = require('../controllers/programController');
const router = express.Router();

// Route to get all programs
router.get('/', getPrograms);

// Route to create a new program
// router.post('/', createProgram);

// Route to delete a program by ID
// router.delete('/:id', deleteProgram);

module.exports = router;
