const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const cart = {
      totalItemCount: req.session.cart.totalItemCount,
    };
    // res.status(200).send({ products, cart });
    //First argument of res.render(): The sub-template that is substituted for {{{body}}} in main.hbs
    res.render('shop/index', { title: 'Products', products });
  } catch (error) {
    next(error);
  }
};
