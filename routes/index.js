const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.name) res.cookie('name', 'steve');
  if (!req.cookies.foo) res.cookie('foo', 'baz');
  if (!req.cookies.otherpath) res.cookie('path', 'other', { path: '/foo' });
  if (!req.cookies.count) res.cookie('count', 1);
  if (req.cookies.count) res.cookie('count', parseInt(req.cookies.count) + 1);
  if (!req.cookies.jwt)
    res.cookie('jwt', 'supersecrettoken', { httpOnly: true });

  res.render('index', { title: req.cookies.name || 'Express' });
});

module.exports = router;
