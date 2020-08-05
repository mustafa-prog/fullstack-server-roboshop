const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const {
  getSignup,
  getLogin,
  postLogin,
  postSignup,
  profile,
} = require('../controllers/userController');

router.use(csurf());

router.route('/signup').get(getSignup).post(postSignup);

router.route('/login').get(getLogin).post(postLogin);

router.get('/profile', profile);

module.exports = router;
