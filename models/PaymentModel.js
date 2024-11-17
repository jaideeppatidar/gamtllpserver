const mongoose = require("mongoose");

const PaymentModel = new mongoose.Schema({
  firstName: {
    type: String,
  },
  userId: {
    type: String,
  },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    amount: { 
        type: Number,
        required: true 
    },
    paymentscreensort: { 
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("PaymentModel", PaymentModel)