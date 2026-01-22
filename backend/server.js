const express = require('express');
const cors = require('cors');
const lifeEventsRoutes = require('./routes/lifeEvents');
const submissionsRoutes = require('./routes/submissions');
const usersRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/life-events', lifeEventsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Life Events Mobile Engine API is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
