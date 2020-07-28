const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};
