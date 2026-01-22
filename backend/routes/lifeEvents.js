const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Reuse the pool from server.js or import it if structured better.
// For MVP simplicity, we might pass the pool or create a new one, but best practice is a shared module.
// We'll trust the pool is globally available or imported from a db module. 
// Let's create a db.js first for cleaner code.
const db = require('../db');

// GET /api/life-events
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM life_events ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/life-events/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM life_events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Life event not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/life-events/:id/actions
router.get('/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM actions WHERE life_event_id = $1 ORDER BY order_index', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
