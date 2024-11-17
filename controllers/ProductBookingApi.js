const { sendBookingEmails } = require("../Nodemailer/userMailOptions");
const Booking = require("../models/Booking");
const userService = require("../services/userServices");
const User = require('../models/userModel');
const { default: mongoose } = require("mongoose");
exports.BookingApi=  async (req, res) => {
    const { productId, title, description, image, income, dailyIncome, ninetyDayIncome, threeSixtyFiveDayIncome, totalIncome, Persantage, userId, firstName,bookingDate,status } = req.body;
    try {
      const booking = new Booking({
        productId,
        title,
        description,
        image,
        income,
        dailyIncome,
        ninetyDayIncome,
        threeSixtyFiveDayIncome,
        totalIncome,
        Persantage,
        userId,
        firstName,
        bookingDate: bookingDate || new Date(),
        status
      });
      await booking.save();
      await sendBookingEmails({
        ...booking.toObject(),
        userEmail
      });
      res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };


  exports.PaymentApproved = async (req, res) => {
    try {
      const { userId } = req.params;
        const booking = await Booking.findOne({ userId: userId, status: 'pending' });
        if (!booking) {
        return res.status(404).json({ message: `No pending booking found for userId: ${userId}` });
      }
        booking.status = 'approved';
      booking.paymentStatus = 'Approved';
      await booking.save();
        const updatedUser = await userService.updateUser(userId, { paymentStatus: 'Approved' });
  
      if (!updatedUser) {
        return res.status(404).json({ message: `Failed to update user status for userId: ${userId}` });
      }
        res.status(200).json({
        message: 'Payment approved successfully',
        booking,
        updatedUser
      });
    } catch (error) {
      console.error('Error approving payment:', error);
      res.status(500).json({ message: 'Failed to approve payment', error });
    }
  };
  








  exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  exports.getBookingsByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
      // Input validation
      if (!userId) {
        return res.status(400).json({
          message: "UserId is required"
        });
      }
        const bookings = await Booking.find({ userId: userId })
        .sort({ createdAt: -1 }) // Optional: sort by creation date, newest first
        .exec();
        if (!bookings || bookings.length === 0) {
        return res.status(404).json({
          message: "No bookings found for this user",
          userId: userId
        });
      }
        return res.status(200).json({
        message: "Bookings retrieved successfully",
        count: bookings.length,
        bookings: bookings
      });
  
    } catch (error) {
      console.error("Error retrieving bookings:", error);
      return res.status(500).json({
        message: "Server error while retrieving bookings",
        error: error.message
      });
    }
  };

  exports.deleteBookingByUserId = async (req, res) => {
    const { productId } = req.params;
  
    try {
       await Booking.findOneAndDelete({
        productId: productId
      });
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };