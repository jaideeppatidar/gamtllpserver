const mongoose = require("mongoose");

const ProfiteIncome = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    firstName: { type: String, required: true }, 
    percentage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("ProfiteIncome", ProfiteIncome);

module.exports = Product;
