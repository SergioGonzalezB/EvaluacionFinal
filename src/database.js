const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/products-app";

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Database connected"))
  .catch((err) => console.log(err));
