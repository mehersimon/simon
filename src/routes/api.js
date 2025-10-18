const express = require('express');
const axios = require('axios');
const { getSarees, filterSarees, saveContactMessage } = require('../services/sarees');

const router = express.Router();

// GET /api/sarees — supports ?q=&color=&design=
router.get('/sarees', async (req, res) => {
  try {
    const { q = '', color = '', design = '' } = req.query;
    // Try Bayanika first if configured
    const bayanikaBase = process.env.BAYANIKA_API_BASE;
    if (bayanikaBase) {
      try {
        const response = await axios.get(`${bayanikaBase}/sarees`, {
          params: { q, color, design },
          timeout: 8000,
        });
        if (Array.isArray(response.data) && response.data.length) {
          return res.json({ source: 'bayanika', items: response.data });
        }
      } catch (e) {
        // fall through to local
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Bayanika API failed, using local data:', e.message);
        }
      }
    }

    const all = await getSarees();
    const filtered = filterSarees(all, { q, color, design });
    res.json({ source: 'local', items: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sarees' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await saveContactMessage({ name, email, message });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

module.exports = router;
