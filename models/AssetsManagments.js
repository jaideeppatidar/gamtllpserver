const mongoose = require("mongoose");

const EmployeeAssetsDocSchema = new mongoose.Schema({
  EmployeeID: {
    type: String,
    required: true,
  },
  EmployeeName: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    required: true,
  },
  dateGiven: {
    type: Date,
    required: true,
  },
  estimatedValue: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  insuranceDetails: {
    type: String,
    required: true,
  },
});

// Format date before sending JSON response
EmployeeAssetsDocSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.dateGiven) {
      ret.dateGiven = ret.dateGiven.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    }
    return ret;
  }
});

const EmployeeAssetsDoc = mongoose.model("EmployeeAssetsDoc", EmployeeAssetsDocSchema);

module.exports = EmployeeAssetsDoc;
