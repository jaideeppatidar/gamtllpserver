const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; 
const userService = require("../services/userServices");

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email !== "superadmin@gmail.com" || password !== "superadmin") {
        return res.status(403).json({ error: "Access denied. Only super admin can log in with these credentials." });
      }
      const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({
        message: "Super Admin Login  successful",
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  };
  exports.approveUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find and update the user's approval status
      const updatedUser = await userService.updateUser(userId, { isApproved: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
      console.error("Error approving user:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  

  exports.EmployeeloginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email ID and Password are required" });
      }
        const user = await userService.findUserByEmail(email); 
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
        const { token } = await userService.authenticateUser({ email, password });
      
      return res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  