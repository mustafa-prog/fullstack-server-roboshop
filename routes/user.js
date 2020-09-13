const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const { body } = require('express-validator');

const {
  getSignup,
  getLogin,
  postLogin,
  postSignup,
  logout,
  profile,
} = require('../controllers/userController');
const passport = require('../lib/auth');
const { checkLoggedIn, checkLoggedOut } = require('../middleware/checkAccess');

const signupValidation = [
  body('email')
    .notEmpty()
    .withMessage('Please provide an E-mail')
    .isEmail()
    .withMessage('E-mail address is not valid')
    .trim()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain lowercase letters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain uppercase letters')
    .matches(/\d/)
    .withMessage('Password must contain numbers')
    .matches(/[@$!%*?&]/)
    .withMessage(
      'Password must contain a special character (@, $, !, %, *, ?, &)'
    )
    .trim()
    .escape(),
  body('creditCard')
    .notEmpty()
    .withMessage('Please provide a credit cart number')
    .isCreditCard()
    .withMessage('Credit card is not valid')
    .trim()
    .escape(),
];

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Please provide an E-mail')
    .isEmail()
    .withMessage('E-mail address is not valid')
    .trim()
    .escape(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('You must provide a password')
    .trim()
    .escape(),
];

router.use(csurf());

router
  .route('/signup')
  .get(checkLoggedOut, getSignup)
  .post(
    signupValidation,
    passport.authenticate('local.signup', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/signup',
      failureFlash: true,
    })
  );

router
  .route('/login')
  .get(checkLoggedOut, getLogin)
  .post(
    loginValidation,
    passport.authenticate('local.login', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/login',
      failureFlash: true,
    })
  );

router.get('/profile', checkLoggedIn, profile);

router.get('/logout', checkLoggedIn, logout);

module.exports = router;
