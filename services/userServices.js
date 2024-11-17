const User = require("../models/userModel");
const helper = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const config = require("../config/config");

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
exports.findAllUsers = async () => {
  try {
    return await User.find(); // Fetch all users from the collection
  } catch (error) {
    console.error("Error querying the database:", error);
    throw new Error("Error querying the database"); // Rethrow the error to be handled by the controller
  }
};


exports.createUser = async (userData) => {
  try {
    const hashedPassword = await helper.hashPassword(userData.password);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log("User saved successfully:", savedUser);
    return savedUser; // Return the saved user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Propagate the error
  }
};

exports.findUserById = async (userId) => {

  return await User.findOne({ userId: userId });
}

exports.deleteUserById = async (userId) => {
  return await User.findOneAndDelete({ userId });
};

exports.authenticateUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials - user not found');
    }
    const token = jwt.sign({ id: user._id, email: user.email },process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log("Generated Token:", token);
    return { user, token };
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    throw error;
  }
};










exports.updateUser = async (userId, userDetails) => {
  return await User.findOneAndUpdate({ userId: userId }, userDetails, {
    new: true,
  });
};

exports.findUserByEmployeeID = async (employeeID) => {
  return await User.findOne({ employeeID });
};

exports.approveUser = async (userId) => {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's approval status
    user.isApproved = true;

    // Save the updated user to the database
    await user.save();

    console.log(`User with ID ${userId} has been approved.`);
    return user;
  } catch (error) {
    console.error('Error approving user:', error);
    throw new Error('Error approving user');
  }
};

exports.findByReferralCode = async (referralCode) => {
  return await User.findOne({ referralCode: referralCode }); // Modify according to your database structure
};
// userService.js

exports.rewardReferrer = async (referrerId) => {
  // Example: Increase referrer’s reward points or give them a bonus
  await User.updateOne(
    { _id: referrerId },
    { $inc: { rewardPoints: 10 } } // Example: Adding 10 reward points
  );
};
// userService.js

exports.rewardReferrer = async (referrerId) => {
  // Example: Increase referrer’s reward points or give them a bonus
  await User.updateOne(
    { _id: referrerId },
    { $inc: { rewardPoints: 10 } } // Example: Adding 10 reward points
  );
};
exports.getUserCount = async () => {
  return await User.countDocuments({});
};
