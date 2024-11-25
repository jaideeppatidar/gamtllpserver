const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  title: {
    type: String,
  },
  Months: { type: Number, },

  image: {
    type: String
  },
  income: {
    type: Number,
  },
  dailyIncome: {
    type: Number
  },
  totalIncome: {
    type: Number
  },
  Persantage: {
    type: String
  },
  userId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  status: { 
    type: String, 
    default: 'pending' 
  },
  bookingDate: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
