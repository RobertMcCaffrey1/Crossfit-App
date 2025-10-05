const express = require('express');
const router = express.Router();
const controller = require('../controllers/workoutController');

// Log a new workout
router.post('/log', controller.logWorkout);

// Get all workouts
router.get('/', controller.getWorkouts);

module.exports = router;