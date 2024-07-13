// src/routes/cursor.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const cursor = User.find().cursor();
    const users = [];
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      users.push(doc);
    }
    res.render('cursor', { users, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
