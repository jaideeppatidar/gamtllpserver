const mongoose = require("mongoose");
const WithdrawalForm = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  bankName: {
    type: String,
  },
  branchName: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  ifscCode: {
    type: String,
  },
  withdrawalMoney: {
    type: Number,
  },
  productName:{
    type:String,
  }
});

const WithdrawalForms = mongoose.model("WithdrawalForm", WithdrawalForm);

module.exports = WithdrawalForms;
