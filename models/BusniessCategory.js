const mongoose = require("mongoose");

const BusniessCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryDescription: { type: String },
  categoryImage: { type: String },
});

module.exports = mongoose.model("BusniessCategory", BusniessCategorySchema);
