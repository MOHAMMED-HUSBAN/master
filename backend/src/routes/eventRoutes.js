
// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/', eventController.getAllEvents);
router.post('/:id/join', auth, eventController.joinEvent);
router.get('/user', auth, eventController.getUserEvents);

module.exports = router;