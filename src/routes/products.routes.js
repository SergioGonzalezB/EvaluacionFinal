const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/validate");

const {
  renderAll,
  renderNew,
  newProduct,
  editProduct,
  saveProduct,
  deleteProduct,
} = require("../controllers/products.controller");

//  Get all products
router.get("/products/all", isAuthenticated, renderAll);

//  Get new product form
router.get("/products/new", isAuthenticated, renderNew);

//  Post new product
router.post("/products/new", isAuthenticated, newProduct);

//  Get individual product
router.get("/products/edit/:id", isAuthenticated, editProduct);

//  Save edited product
router.put("/products/edit/:id", isAuthenticated, saveProduct);

// Delete individual product
router.delete("/products/edit/:id", isAuthenticated, deleteProduct);

module.exports = router;
