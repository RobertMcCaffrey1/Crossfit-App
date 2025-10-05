// server/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // correctly pointing to db.js

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

  try {
    const totalWorkouts = await pool.query(
      'SELECT COUNT(*) FROM workouts WHERE user_id = $1',
      [userId]
    );

    const totalVolume = await pool.query(
      'SELECT COALESCE(SUM(sets * reps * weight), 0) AS total_volume FROM workouts WHERE user_id = $1',
      [userId]
    );

    const mostCommonExercise = await pool.query(
      `SELECT exercise FROM workouts
       WHERE user_id = $1
       GROUP BY exercise
       ORDER BY COUNT(*) DESC
       LIMIT 1`,
      [userId]
    );

    const lastWorkoutDate = await pool.query(
      'SELECT MAX(date) AS last_workout_date FROM workouts WHERE user_id = $1',
      [userId]
    );

    res.json({
      userId,
      totalWorkouts: Number(totalWorkouts.rows[0].count),
      totalVolume: Number(totalVolume.rows[0].total_volume),
      mostCommonExercise: mostCommonExercise.rows[0]?.exercise || null,
      lastWorkoutDate: lastWorkoutDate.rows[0]?.last_workout_date || null
    });

  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Something went wrong fetching analytics.' });
  }
});

module.exports = router;