const mongoose = require("mongoose");

const EmployeeDocument = new mongoose.Schema({
  
  documentType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  uploaded: {
    type: String,
    enum: ["Upload", "Not Upload"],
  },
  state: {
    type: String,
    default: "PENDING", // Default state
  },
  documentFile: {
    type: String, // Store the path of the uploaded file
    default: null,
  },

});

const EmployeeDoc = mongoose.model("DocumentUpload", EmployeeDocument);

module.exports = EmployeeDoc;
