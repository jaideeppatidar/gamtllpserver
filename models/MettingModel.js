const mongoose = require("mongoose");

const EmployeeMettingSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    default: function() {
      // Generate a random string of 9 characters
      const randomString = Math.random().toString(36).substring(2, 11).toUpperCase();
      // Prefix with PRD and return
      return `PRD${randomString}`;
    }
  },
  ProductName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Income: {
    type: Number, 
    required: true,
  },
  Persantage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
   Months: { type: Number, required: true },
});

EmployeeMettingSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.reviewDate) {
      ret.reviewDate = ret.reviewDate.toISOString().split("T")[0]; // Extract only the date part
    }
    if (ret.nextMeetingDate) {
      ret.nextMeetingDate = ret.nextMeetingDate.toISOString().split("T")[0]; // Extract only the date part
    }
    return ret;
  },
});
const EmployeeDoc = mongoose.model("Meeting", EmployeeMettingSchema);
module.exports = EmployeeDoc;
