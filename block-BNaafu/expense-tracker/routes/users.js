const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* Register */
router.get('/register', (req, res) => {
  const error = req.flash('error')[0];
  const emailUniqueError = req.flash('emailUniqueError')[0];
  res.render('register', { error, emailUniqueError });
});
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      if (err.name === 'MongoError') {
        req.flash('emailUniqueError', 'This email is already taken');
        return res.redirect('users/register');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('users/register');
      }
    }
    res.redirect('/users/login');
  });
});
/* Login */
router.get('/login', (req, res) => {
  const error = req.flash('error')[0];
  res.render('login', { error });
});
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Password is not correct');
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.render('onboard');
    });
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login');
});

module.exports = router;
