const passport = require('passport');
const GitHubStrategy = require('passport-github2');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: '/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  const profileData = {
    name: profile.displayName,
    username: profile.username,
    email: profile._json.email,
    photo: profile._json.avatar_url,
  };
  User.findOne({ username: profile.username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      User.create(profileData, (err, addedUser) => {
        if (err) {
          return done(err);
        }
        return done(null, addedUser);
      });
    }
    return done(null, user);
  });
}));
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile);
  const profileData = {
    name: profile.displayName,
    username: profile.username,
    email: 'santoshbalchandran@gmail.com',   // hard coded
    photo: profile._json.avatar_url,
  };
  User.findOne({ username: profile.userename }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      User.create(profileData, (err, addedUser) => {
        if (err) {
          return done(err);
        }
        return done(null, addedUser);
      });
    } else {    
    return done(null, user);
    }
  });
}));
