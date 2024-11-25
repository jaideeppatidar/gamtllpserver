const AddIncomemodel = require('../models/AddIncomemodel'); // Assuming you have a Booking model
exports.Addincome = async (req, res) => {
  const {
    productId,
    income,
    userId,
  
  } = req.body;

  try {
    const Addincome = new AddIncomemodel({
      productId,
      income,
      userId,
    });
    await Addincome.save();
   
    res.status(201).json({ message: "Booking successful", });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.editincome = async (req, res) => {
  const { userId } = req.params; 
  const { income, productId } = req.body; 

  try {
    if (!income || !productId) {
      return res.status(400).json({ message: "Income and User ID are required" });
    }
    const updatedBooking = await AddIncomemodel.findOneAndUpdate(
      { userId },
      { income, productId }, 
      { new: true, runValidators: true } 
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.GetIncomeByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  try {
    // Find the income records by userId
    const incomeRecords = await AddIncomemodel.find({ userId });

    if (incomeRecords.length === 0) {
      return res.status(404).json({ message: "No income records found for this user" });
    }

    // Return the income records
    res.status(200).json(incomeRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
