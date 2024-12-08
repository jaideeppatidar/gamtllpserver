const AddIncomemodel = require('../models/AddIncomemodel'); // Assuming you have a Booking model
exports.Addincome = async (req, res) => {
  const {
    productId,
    income,
    userId,
    firstName, 
    percentage,
  } = req.body;
  try {
    const Addincome = new AddIncomemodel({
      productId,
      income,
      userId,
      firstName, 
      percentage,
    });
    await Addincome.save();
   
    res.status(201).json({ message: "Booking successful", });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.editincome = async (req, res) => {
  const { userId } = req.params; 
  const { income, productId ,firstName, percentage } = req.body; 

  try {
    const updatedBooking = await AddIncomemodel.findOneAndUpdate(
      { userId },
      { income, productId, firstName, percentage },
      { new: true, runValidators: true } 
    );
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
exports.getAllIcome = async (req, res) => {
  try {
    const Income = await AddIncomemodel.find();
    res.status(200).json(Income);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.deleteIncome = async (req, res) => {
  try {
      const { userId } = req.params;
            const deletedCategory = await AddIncomemodel.findOneAndDelete({userId});
      res.status(200).json({
          message: " deleted successfully",
          deletedCategory,
      });
  } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};
