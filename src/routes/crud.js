const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('crud', { user: req.user });
});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/update', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.updateOne(
      { email },
      { password: hashedPassword }
    );
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/updateMany', async (req, res) => {
  const { emails, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUsers = await User.updateMany(
      { email: { $in: JSON.parse(emails) } },
      { password: hashedPassword }
    );
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/replace', async (req, res) => {
  const { email, newEmail, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const replacedUser = await User.replaceOne(
      { email },
      { email: newEmail, password: hashedPassword }
    );
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/delete', async (req, res) => {
  const { email } = req.body;
  try {
    const deletedUser = await User.deleteOne({ email });
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/deleteMany', async (req, res) => {
  const { emails } = req.body;
  try {
    const deletedUsers = await User.deleteMany({
      email: { $in: JSON.parse(emails) },
    });
    res.redirect('/crud');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/find', async (req, res) => {
  const { email } = req.query;
  try {
    const users = await User.find(email ? { email } : {}, { password: 0 });
    res.render('crud', { user: req.user, users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
