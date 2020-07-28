const Cart = require('../models/cartModel');

exports.initCart = (req, res, next) => {
  console.log(req.session.cart);
  req.session.cart = new Cart(req.session.cart);
  req.session.cart.add('1234', { name: 'foo', price: 99.99 });
  console.log('currentCart', req.session.cart);
  next();
};
