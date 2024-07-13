const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('register', { user: req.user });
});

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', {
        error: 'User with this email already exists',
        user: req.user,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    req.login(newUser, function (err) {
      if (err) return next(err);
      return res.redirect('/protected');
    });
  } catch (error) {
    console.error(error);
    res.redirect('/auth/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error, user: req.user });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/auth/login?error=Incorrect email or password.');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/protected');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
