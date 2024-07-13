const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('./config/passport');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const crudRoutes = require('./routes/crud');
const cursorRoutes = require('./routes/cursor');
app.use('/cursor', cursorRoutes);
const aggregationRoutes = require('./routes/aggregation');
app.use('/aggregation', aggregationRoutes);

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/crud', crudRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
