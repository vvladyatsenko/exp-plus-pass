const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          averagePasswordLength: { $avg: { $strLenCP: '$password' } },
        },
      },
    ]);
    res.render('aggregation', { stats: stats[0], user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
