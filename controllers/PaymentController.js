const PaymentModel = require('../models/PaymentModel')
exports.PaymentMethod = async (req, res) => {
    try { 
      const { date, amount,paymentscreensort,firstName,userId } = req.body;
      const screenshotPath = req.file ? req.file.path : paymentscreensort;
      if (!date || !amount) {
        return res.status(400).json({ 
            error: 'Date and amount are required fields' 
        });
    }
      const PaymentScreensortDetails = new PaymentModel({
        firstName,
        userId,
        date,
        amount,
        paymentscreensort: screenshotPath});
      await PaymentScreensortDetails.save();
      res.status(201).json({
        message: 'Payment details send successfully',
        PaymentScreensortDetails:PaymentScreensortDetails
      });
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };
  exports.getAllPaymentDetails = async (req, res) => {
    try {
        const PaymentDetails = await PaymentModel.find(); 
        res.status(200).json({
            message: "Business categories retrieved successfully",
            PaymentDetails:PaymentDetails
        });
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
};

exports.getPaymentDetailsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        // Validate userId
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }
                const PaymentDetails = await PaymentModel.find({ userId });

        if (PaymentDetails.length === 0) {
            return res.status(404).json({ message: "No payment details found for the given userId" });
        }
        res.status(200).json({
            message: "Payment details retrieved successfully",
            PaymentDetails:PaymentDetails
        });
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
};
