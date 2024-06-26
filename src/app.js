const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('./config/passport');

const app = express();

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express Passport Auth App');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
