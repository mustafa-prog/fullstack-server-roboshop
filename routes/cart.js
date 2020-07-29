const express = require('express');
const router = express.Router();

const {
  getCart,
  addItemToCart,
  removeProductItemFromCart,
  removeProductFromCart,
} = require('../controllers/cartController');

router.get('/', getCart);
router.get('/add/:id', addItemToCart);
router.get('/remove/:id', removeProductItemFromCart);
router.get('/removeall/:id', removeProductFromCart);

module.exports = router;
