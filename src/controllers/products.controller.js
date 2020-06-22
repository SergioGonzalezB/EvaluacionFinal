const productsCtrl = {};
const Product = require("../models/Product");

//  Get all products
productsCtrl.renderAll = async (req, res) => {
  const products = await Product.find().sort({ ProductName: "asc" });
  res.render("products/all", { products });
};

//  New product form
productsCtrl.renderNew = (req, res) => {
  res.render("products/new");
};

//  New product post
productsCtrl.newProduct = async (req, res) => {
  const { ProductName, Category, Price, Description } = req.body;
  const newProduct = new Product({ ProductName, Category, Price, Description });
  await newProduct.save();

  //Send flash message
  req.flash("success_msg", "New product successfully added");
  res.redirect("/products/all");
};

//  Get individual product
productsCtrl.editProduct = async (req, res) => {
  await Product.findById(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).send({ message: `Query error: ${err}` });
    }
    if (!product) {
      return res.status(404).send({ message: `Product does not exist` });
    }
    res.render("products/edit", { product });
  });
};

//  Save edited product
productsCtrl.saveProduct = async (req, res) => {
  const { ProductName, Category, Price, Description } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    ProductName,
    Category,
    Price,
    Description,
  });
  req.flash("success_msg", "Product succesfully updated");
  res.redirect("/products/all");
};

//  Delete individual product
productsCtrl.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Product succesfully deleted");
  res.redirect("/products/all");
};

module.exports = productsCtrl;
