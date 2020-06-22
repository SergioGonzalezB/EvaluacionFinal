const helpers = {};

//  Middleware for user validation in database URL
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Unauthorized access");
    res.redirect("/users/login");
  }
};

module.exports = helpers;
