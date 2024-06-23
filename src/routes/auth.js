const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const users = [];

async function addTestUsers() {
  const testUsers = [
    { email: 'user1@example.com', password: 'password123' },
    { email: 'user2@example.com', password: 'password123' },
  ];

  for (const user of testUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    users.push({ id: uuidv4(), email: user.email, password: hashedPassword });
  }
}

addTestUsers().catch(console.error);

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ id: uuidv4(), email, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/auth/login',
    failureFlash: false,
  })
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
