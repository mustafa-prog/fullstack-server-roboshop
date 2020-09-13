const Cart = require('../models/cartModel');
const _ = require('lodash');
const { numeralize } = require('../lib/helpers');

// Instantiate a Cart and add it to the session
// If a previous cart exists, use that, otherwise create a new one
exports.initCart = (req, res, next) => {
  req.session.cart = new Cart(req.session.cart);
  next();
};

// Make session data available to all views
exports.setLocals = (req, res, next) => {
  res.locals.session = req.session;
  res.locals.session = _.cloneDeep(req.session);
  for (let item in res.locals.session.cart.items) {
    res.locals.session.cart.items[item].product.price = numeralize(
      res.locals.session.cart.items[item].product.price
    );
    res.locals.session.cart.items[item].subTotal = numeralize(
      res.locals.session.cart.items[item].subTotal
    );
  }
  res.locals.shop = 'RoboShop';
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  next();
};
