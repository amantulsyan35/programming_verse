if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
let cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const session = require('express-session');
// const ExpressError = require('./utils/ExpressError');
const { urlencoded } = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');

//models
const User = require('./models/user');

//Routes
const programRoutes = require('./routes/programs');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

mongoose
  .connect('mongodb://localhost:27017/program')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(express.json());
const sessionConfig = {
  secret: 'thisshouldbeabettersecret',
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

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

app.use('/api/programs', programRoutes);
app.use('/api/programs/:id/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// app.all('*', (req, res, next) => {
//   next(new ExpressError('Page Not Found', 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = 'Oh No, Something Went Wrong!';
//   res.status(statusCode).send('error', { err });
// });

let PORT = 8080;
app.listen(PORT, () => {
  console.log('server is running');
});
