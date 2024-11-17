const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      // default: uuidv4,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2, // Minimum length for first name
    },
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15, // Set max length if needed
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex validation for email
    },
    aadharCard: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    referralCode: {
      type: String,
      unique: true,
    },
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    referralLink:
     { type: String },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);
