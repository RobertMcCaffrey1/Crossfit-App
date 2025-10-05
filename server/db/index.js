// server/index.js
const express = require('express');
const app = express();
const analyticsRoute = require('./routes/analytics');

app.use(express.json());
app.use(analyticsRoute); // adds your /api/analytics route

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});