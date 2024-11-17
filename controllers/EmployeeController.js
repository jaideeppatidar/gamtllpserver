const userService = require("../services/userServices");
const User = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;
const { sendWelcomeEmail, generateOTP } = require("../Nodemailer/Nodemailer");
const bcrypt = require("bcrypt");
const { storeOTP, verifyOTP } = require("../otpStore/otpStore");

const generateUserId = async () => {
  const prefix = "GAMTLLP";

  const lastUser = await User.findOne({ userId: { $regex: `^${prefix}` } })
    .sort({ userId: -1 })
    .exec();

  let newId = 1;
  if (lastUser) {
    const lastNumericSuffix = parseInt(lastUser.userId.replace(prefix, ""), 10);
    newId = lastNumericSuffix + 1;
  }

  const newUserId = `${prefix}${newId.toString().padStart(3, "0")}`;
  return newUserId;
};

// exports.createUser = async (req, res) => {
//   try {
//     const { firstName, email, password, mobile, address } = req.body;
//     const aadharCard = req.files?.aadharCard?.[0]?.path;
//     const panCard = req.files?.panCard?.[0]?.path;
//     if (
//       !firstName ||
//       !email ||
//       !password ||
//       !mobile ||
//       !address ||
//       !aadharCard ||
//       !panCard
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const userId = await generateUserId();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await userService.createUser({
//       _id: new ObjectId(),
//       userId,
//       firstName,
//       email,
//       password: hashedPassword,
//       mobile,
//       address,
//       aadharCard,
//       panCard,
//       isApproved: false,
//     });
//     const otp = generateOTP();

//     // Store OTP for the user with expiration
//     storeOTP(newUser.userId, otp);

//     // Send OTP email
//     await sendWelcomeEmail(newUser, otp);;

//     return res
//       .status(201)
//       .json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

const generateReferralCode = () => {
  const randomStr = Math.random().toString(36).substr(2, 7).toUpperCase(); // Random 7-character string in uppercase
  return `GAMTLLP-${randomStr}`;
};


exports.createUser = async (req, res) => {
  try {
    const { firstName, email, password, mobile, address, referralCode } =
      req.body;
    const aadharCard = req.files?.aadharCard?.[0]?.path;
    const panCard = req.files?.panCard?.[0]?.path;

    if (
      !firstName ||
      !email ||
      !password ||
      !mobile ||
      !address ||
      !aadharCard ||
      !panCard
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userId = await generateUserId();
    const hashedPassword = await bcrypt.hash(password, 10);

    let referrer = null;
    if (referralCode) {
      referrer = await userService.findByReferralCode(referralCode);
      if (!referrer) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
    }

    const newReferralCode = generateReferralCode(userId);
    console.log("Generated Referral Code:", newReferralCode);
    const referralLink = `https://gamtllp.com/register?referralCode=${newReferralCode}`;

    const newUser = await userService.createUser({
      _id: new ObjectId(),
      userId,
      firstName,
      email,
      password: hashedPassword,
      mobile,
      address,
      aadharCard,
      panCard,
      isApproved: false,
      referralCode: newReferralCode,
      referrerId: referrer ? referrer._id : null,
      referralLink: referralLink 
    });

    const otp = generateOTP();
    storeOTP(newUser.userId, otp);
    await sendWelcomeEmail(newUser, otp);

    if (referrer) {
      await userService.rewardReferrer(referrer._id);
    }

    // Generate the referral link

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      referralLink: referralLink
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


// exports.verifyOTP = async (req, res) => {
//   console.log("Request Params:", req.params);
//   try {
//     const { otp } = req.body;
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ error: "User ID is missing in the request" });
//     }

//     console.log("OTP:", otp, "UserID:", userId);

//     const isValid = await verifyOTP(userId, otp);
//     if (isValid) {
//       const user = await User.find(userId);
//       if (user) {
//         await sendVerificationSuccessEmail(user);
//         return res.status(200).json({ message: "Email verified successfully" });
//       } else {
//         return res.status(404).json({ error: "User not found" });
//       }
//     } else {
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     }
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let updatedUserData = req.body;
    if (!updatedUserData.firstName || !updatedUserData.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await userService.findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await userService.updateUser(userId, updatedUserData);
    if (!updatedUser) {
      return res.status(400).json({ error: "Failed to update user" });
    }
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    if (!users || users.length === 0) {
      return res.status(200).json({ users: [] }); // Return an empty array instead of 404
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params; // Assuming userId is the DailyIncome

    const user = await userService.findUserById(userId); // Query based on DailyIncome
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await userService.deleteUserById(user.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
