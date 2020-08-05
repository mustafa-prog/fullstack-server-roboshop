const mongoose = require('mongoose');
const createError = require('http-errors');
const { numeralize } = require('../lib/helpers');

const Product = require('../models/productModel');

exports.getCart = (req, res, next) => {
  const VAT = 19;
  const { VATSum, finalPrice } = req.session.cart.calcVAT(VAT);
  console.log('req.session.cart.totalPrice', req.session.cart.totalPrice);
  res.status(200).render('shop/cart', {
    title: 'Shopping Cart',
    VAT,
    totalPrice: numeralize(req.session.cart.totalPrice),
    VATSum: numeralize(VATSum),
    finalPrice: numeralize(finalPrice),
  });
};

exports.addItemToCart = async (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Get product based with provided ID
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new createError.InternalServerError();
    const product = await Product.findById(id);
    if (!product) throw new createError.NotFound();
    // Add to cart in session
    req.session.cart.add(id, product);
    // Temporarily send new cart as JSON
    // res.status(200).send(req.session.cart);
    // Redirect request back to where it was made from (referer)
    res.status(200).redirect('back');
  } catch (err) {
    next(err);
  }
};

exports.removeProductItemFromCart = (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Remove from Cart in session
  req.session.cart.removeOne(id);
  // Redirect request back to where it was made from (referer)
  res.status(200).redirect('back');
};

exports.removeProductFromCart = (req, res, next) => {
  // Get Product ID from request parameters
  const { id } = req.params;
  // Remove from Cart in session
  req.session.cart.removeAll(id);
  // Redirect request back to where it was made from (referer)
  res.status(200).redirect('back');
};
