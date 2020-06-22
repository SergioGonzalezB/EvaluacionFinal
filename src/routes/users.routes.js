const { Router } = require("express");
const router = Router();
const {
  login,
  renderLogin,
  renderSignup,
  logout,
  signup,
} = require("../controllers/users.controller");

//  Get sign up form
router.get("/users/signup", renderSignup);

//  Send sign up form
router.post("/users/signup", signup);

//  Get login form
router.get("/users/login", renderLogin);

//  Send login form
router.post("/users/login", login);

//  User log out
router.get("/users/logout", logout);

module.exports = router;
