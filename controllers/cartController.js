const mongoose = require('mongoose');
const createError = require('http-errors');

const Product = require('../models/productModel');

exports.getCart = (req, res, next) => {
  res.status(200).send(req.session.cart);
};

exports.addItemToCart = async (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Get product based with provided ID
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new createError.InternalServerError();
    const product = await Product.findById(id);
    // Add to cart in session
    req.session.cart.add(id, product);
    // Temporarily send new cart as JSON
    res.status(200).send(req.session.cart);
  } catch (err) {
    next(err);
  }
};

exports.removeProductItemFromCart = (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Remove from Cart in session
  req.session.cart.removeOne(id);
  // Temporarily send new cart as JSON
  res.status(200).send(req.session.cart);
};

exports.removeProductFromCart = (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Remove from Cart in session
  req.session.cart.removeAll(id);
  // Temporarily send new cart as JSON
  res.status(200).send(req.session.cart);
};
