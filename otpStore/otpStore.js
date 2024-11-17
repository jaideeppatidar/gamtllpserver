// Store OTP in memory (you can use a database for production)
let otpStore = {};

// Store OTP with expiration time (10 minutes)
const storeOTP = (userId, otp) => {
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
  otpStore[userId] = { otp, expirationTime };
};

// Verify OTP
const verifyOTP = (userId, enteredOtp) => {
  const storedOTP = otpStore[userId];
  
  if (!storedOTP) {
    return false;
  }

  const { otp, expirationTime } = storedOTP;
  if (Date.now() > expirationTime) {
    delete otpStore[userId]; 
    return false;
  }
  return enteredOtp === otp;
};

module.exports = { storeOTP, verifyOTP };
