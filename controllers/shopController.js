const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const cart = {
      totalItemCount: req.session.cart.totalItemCount,
    };
    res.status(200).send({ products, cart });
  } catch (error) {
    next(error);
  }
};
