const usersCtrl = {};
const User = require("../models/User");
const passport = require("passport");

//Get sign up form
usersCtrl.renderSignup = (req, res) => {
  res.render("users/signup");
};

//  Post sign up
usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { email, password, password2 } = req.body;

  if (password != password2) {
    errors.push({ text: "Password and confirmation do no match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", { errors, email });
  } else {
    //  Search existing users
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Email already registered");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "User successfully registered");
      res.redirect("/users/login");
    }
  }
};

// Get login form
usersCtrl.renderLogin = (req, res) => {
  res.render("users/login");
};

//  Post login in
usersCtrl.login = passport.authenticate("local", {
  failureRedirect: "/users/login",
  successRedirect: "/products/all",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
};

module.exports = usersCtrl;
