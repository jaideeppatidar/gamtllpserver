const ProfiteIncome = require('../models/ProfiteModel'); // Assuming you have a Booking model
exports.AddProfite = async (req, res) => {
  const {
    productId,
    income,
    userId,
  } = req.body;
  try {
    const Addincome = new ProfiteIncome({
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
exports.AddProfiteEdite = async (req, res) => {
  const { userId } = req.params; 
  const { income, productId } = req.body; 

  try {
    const updatedBooking = await ProfiteIncome.findOneAndUpdate(
      { userId },
      { income, productId }, 
      { new: true, runValidators: true } 
    );
    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getAddProfiteById = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  try {
    // Find the income records by userId
    const incomeRecords = await ProfiteIncome.find({ userId });

    if (incomeRecords.length === 0) {
      return res.status(404).json({ message: "No income records found for this user" });
    }

    // Return the income records
    res.status(200).json(incomeRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getAllProfite = async (req, res) => {
  try {
    const Income = await ProfiteIncome.find();
    res.status(200).json(Income);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.deleteProfite = async (req, res) => {
  try {
      const { userId } = req.params;
            const deletedCategory = await ProfiteIncome.findOneAndDelete(userId);
      res.status(200).json({
          message: " deleted successfully",
          deletedCategory,
      });
  } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};
