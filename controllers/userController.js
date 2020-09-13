const User = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.getSignup = (req, res, next) => {
  // Provide the CSRF token to the view via a function that  was added to req by the csurf middleware
  // Pass the req.flash() messages to the view
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    errors: req.flash('error'),
    title: 'Signup',
  });
};
/*
exports.postSignup = async (req, res, next) => {
  const { email, password, creditCard } = req.body;
  try {
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      req.flash('flasherror', errors.array());
      res.redirect('/user/signup');
    }
    await User.create({ email, password, creditCard });
    res.redirect('/user/profile');
  } catch (error) {
    //console.log(error);
    if (error.name === 'MongoError' && error.code === 11000) {
      req.flash('flasherror', 'E-mail is already registered');
      res.redirect('/user/signup');
    }
  }
};
*/

exports.getLogin = (req, res, next) => {
  res.render('user/login', {
    csrfToken: req.csrfToken(),
    errors: req.flash('error'),
    title: 'Login',
  });
};

/*
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array());
      res.redirect('/user/login');
    }
    const user = await User.findOne({ email });
    const redirectOnNotFound = () => {
      req.flash('error', 'E-mail or password are incorrect');
      res.redirect('/user/login');
    };
    if (!user) redirectOnNotFound();
    const authenticated = await user.authenticate(password);
    if (!authenticated) redirectOnNotFound();
    res.redirect('/user/profile');
  } catch (error) {
    console.log(error);
    res.redirect('/user/login');
  }
};
*/

exports.profile = (req, res, next) => {
  res.render('user/profile', { title: 'Profile' });
};

exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
