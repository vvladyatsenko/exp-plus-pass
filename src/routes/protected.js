const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

router.get('/', isAuthenticated, (req, res) => {
  res.render('protected', { user: req.user });
});

module.exports = router;
