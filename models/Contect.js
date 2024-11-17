const mongoose = require("mongoose");

const EmployeeContact = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Mobile: {
    type: Number,
  },
  Subject: {
    type: String,
  },
  Comments: {
    type: String,
  },
});

const Contact = mongoose.model("EmoloyeeDoc", EmployeeContact);

module.exports = Contact;
