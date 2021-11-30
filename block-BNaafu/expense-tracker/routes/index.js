const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/contact', (req, res) => {
  res.render('contact');
});
router.get('/dashboard', (req, res) => {
  const authProvider = req.flash('authProvider');
  console.log(authProvider);
  res.render('dashboard', { authProvider });
});
// Github Authentication
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  (req, res) => {
    req.flash('authProvider', 'github');
    res.redirect('/dashboard');
  });
// Google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  (req, res) => {
    req.flash('authProvider', 'google');
    res.redirect('/dashboard');
  });

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = router;
