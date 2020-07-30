const Cart = require('../models/cartModel');

exports.initCart = (req, res, next) => {
  req.session.cart = new Cart(req.session.cart);
  next();
};
