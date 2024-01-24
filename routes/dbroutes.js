const express = require('express');
const router = express.Router();

router.post('/api/user', (req, res) => {
    const { id, fullname, password } = req.body;

    if (!id || !fullname || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received data:', { id, fullname, password });

    res.json({ message: 'Data received successfully' });
});
router.get('/customer', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customer');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});