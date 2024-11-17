const withdrawalRequest = require("../models/withdrawalForm");

exports.withdrawal = async (req, res) => {
    try {
      const { name, userId, bankName, branchName,accountNumber,ifscCode,withdrawalMoney,productName } = req.body; 
      const Withdrawal = new withdrawalRequest({
        name,
        userId,
        bankName,
        branchName, 
        accountNumber,
        ifscCode,  
        withdrawalMoney,
        productName
      });
      await Withdrawal.save();
      res.status(201).json({
        message: "Thank you! your requerst is submitted successfully!",
        Withdrawal: Withdrawal,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };













  
  exports.getWithdrawalRequests = async (req, res) => {
    try {
      const { userId } = req.query;
        const filter = userId ? { userId } : {};
      const withdrawalRequests = await withdrawalRequest.find(filter);
  
      res.status(200).json({
        message: "Withdrawal Requests Retrieved Successfully",
        data: withdrawalRequests,
      });
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };