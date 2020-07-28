const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/shopController');

router.get('/', getProducts);

module.exports = router;
