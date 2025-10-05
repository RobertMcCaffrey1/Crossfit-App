import React, { useState } from 'react';
import WorkoutChart from './WorkoutChart';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏋️ CrossFit Tracker Dashboard</h1>
      <WorkoutChart data={workouts} />
    </div>
  );
}

export default Dashboard;