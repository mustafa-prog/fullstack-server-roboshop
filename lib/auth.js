const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');

// Config object for Passport that maps our field names to their schema
const strategyConfig = {
  usernameField: 'email',
  passwordField: 'password',
  // Also pass the req object to the callback
  passReqToCallback: true,
};

// Limit data saved to session cookie...
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ...and retrieve full user when we receive a request
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configure Passport strategy for Signup
passport.use(
  'local.signup',
  new LocalStrategy(strategyConfig, async function (
    req,
    email,
    password,
    done
  ) {
    const { creditCard } = req.body;

    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array());
      return done(null, false);
    }
    try {
      const user = await User.create({ email, password, creditCard });
      // Call done() when job is complete
      // Since it's error-first, pass null, then the user
      return done(null, user);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        return done(null, false, { message: 'E-mail is already registered' }); // Will call req.flash('error', 'message');
      }
      return done(error);
    }
  })
);

passport.use(
  'local.login',
  new LocalStrategy(strategyConfig, async function (
    req,
    email,
    password,
    done
  ) {
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array());
      return done(null, false);
    }
    try {
      const user = await User.findOne({ email });
      if (!user)
        return done(null, false, { message: 'E-Mail or password incorrect' });
      const authenticated = await user.authenticate(password);
      if (!authenticated)
        return done(null, false, { message: 'E-Mail or password incorrect' });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports = passport;
