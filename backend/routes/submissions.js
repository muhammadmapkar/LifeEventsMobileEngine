const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/submissions
router.post('/', async (req, res) => {
    try {
        const { user_id, action_id, data } = req.body;

        // Check if user exists (simple check or assume valid from auth middleware later)
        // Check if action exists

        // Insert or Update submission
        const query = `
      INSERT INTO user_progress (user_id, action_id, status, submitted_data, submission_date)
      VALUES ($1, $2, 'submitted', $3, NOW())
      RETURNING *;
    `;
        const values = [user_id, action_id, data];

        const result = await db.query(query, values);

        // In a real app, this would trigger the "Single-Click Submission" logic to external APIs

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/submissions/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await db.query('SELECT * FROM user_progress WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
