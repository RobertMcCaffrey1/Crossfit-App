import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function WorkoutChart({ data }) {
  // Optional: Filter for a specific exercise like "Squat"
  const squatData = data
    .filter(w => w.name.toLowerCase() === 'squat')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ height: 300 }}>
      <h2>📈 Squat Progress Over Time</h2>
      {squatData.length === 0 ? (
        <p>No squat data yet. Log some workouts!</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={squatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="weight" />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default WorkoutChart;