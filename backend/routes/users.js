const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const { name, email, national_id } = req.body;
        const result = await db.query(
            'INSERT INTO users (name, email, national_id) VALUES ($1, $2, $3) RETURNING *',
            [name, email, national_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(409).json({ error: 'User already exists' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/users/:email
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
