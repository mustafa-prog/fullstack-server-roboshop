exports.checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) res.redirect('/user/login');
  next();
};

exports.checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) res.redirect('/');
  next();
};
