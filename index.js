if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
let cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const { urlencoded } = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

//models
const User = require('./models/user');

//Routes
const programRoutes = require('./routes/programs');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

const secret = process.env.SECRET;

const sessionConfig = {
  name: 'Session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/programs', programRoutes);
app.use('/api/programs/:id/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = 'Oh No, Something Went Wrong!';
//   res.status(statusCode).send('Oh No, Something Went Wrong!');
// });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server is running');
});
