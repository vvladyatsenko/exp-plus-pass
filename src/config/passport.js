const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const users = [];

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

module.exports = passport;
