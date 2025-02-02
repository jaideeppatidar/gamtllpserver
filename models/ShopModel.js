const mongoose = require("mongoose");
const EmployeeMettingSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    default: function () {
      const randomString = Math.random()
        .toString(36)
        .substring(2, 11)
        .toUpperCase();
      return `PRD${randomString}`;
    },
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
  Kilogram: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

EmployeeMettingSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.reviewDate) {
      ret.reviewDate = ret.reviewDate.toISOString().split("T")[0];
    }
    if (ret.nextMeetingDate) {
      ret.nextMeetingDate = ret.nextMeetingDate.toISOString().split("T")[0];
    }
    return ret;
  },
});
const EmployeeDoc = mongoose.model("ShopData", EmployeeMettingSchema);
module.exports = EmployeeDoc;
