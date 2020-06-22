const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  ProductName: { type: String },
  Category: {
    type: String,
    required: true,
    enum: ["Computers", "Phones", "Accesories"],
  },
  Price: { type: Number, min: 1 },
  Description: { type: String },
});

module.exports = model("Product", ProductSchema);
