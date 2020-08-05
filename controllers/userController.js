const User = require('../models/userModel');

exports.getSignup = (req, res, next) => {
  res.render('user/signup', { csrfToken: req.csrfToken() });
};

exports.postSignup = async (req, res, next) => {
  const { email, password, creditCard } = req.body;
  try {
    await User.create({ email, password, creditCard });
    res.redirect('/user/profile');
  } catch (error) {
    //console.log(error);
    if (error.name === 'MongoError' && error.code === 11000) {
      res.redirect('/user/signup');
    }
  }
};

exports.getLogin = (req, res, next) => {
  res.render('user/login', { csrfToken: req.csrfToken() });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.redirect('/user/login');
    const authenticated = await user.authenticate(password);
    if (!authenticated) res.redirect('/user/login');
    res.redirect('/user/profile');
  } catch (error) {
    console.log(error);
    res.redirect('/user/login');
  }
};

exports.profile = (req, res, next) => {
  res.render('user/profile');
};
