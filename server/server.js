const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const workoutRoutes = require('./server/routes/workoutRoutes');        // ✅ Your existing routes
const analyticsRoutes = require('./server/routes/analyticsRoutes');    // ✅ Your new analytics route

app.use('/api/workouts', workoutRoutes);  // All workout routes start with /api/workouts
app.use('/api/analytics', analyticsRoutes); // All analytics routes start with /api/analytics

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});