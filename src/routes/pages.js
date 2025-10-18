const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Sambalpuri Saree Hub' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About — Sambalpuri Saree Hub' });
});

router.get('/find', (req, res) => {
  res.render('find', { title: 'Find Saree — Sambalpuri Saree Hub' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact — Sambalpuri Saree Hub' });
});

module.exports = router;
