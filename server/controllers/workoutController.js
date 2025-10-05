const pool = require('../db');

// POST /api/workouts/log
exports.logWorkout = async (req, res) => {
  const { user_id, exercise, reps, sets, weight, date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO workouts (user_id, exercise, reps, sets, weight, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, exercise, reps, sets, weight, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error logging workout:', err.message);
    res.status(500).send('Server error');
  }
};

// GET /api/workouts
exports.getWorkouts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workouts ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching workouts:', err.message);
    res.status(500).send('Server error');
  }
};