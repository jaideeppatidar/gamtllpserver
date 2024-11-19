const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  Months: { type: Number, required: true },

  image: {
    type: String
  },
  income: {
    type: Number,
    required: true
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
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  status: { 
    type: String, 
    required: true, 
    default: 'pending' 
  },
  bookingDate: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
