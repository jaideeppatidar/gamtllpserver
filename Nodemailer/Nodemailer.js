const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const generateOTP = () => {
  return crypto.randomInt(100000, 999999); 
};
const sendWelcomeEmail = async (user, otp) => {
  console.log(user);
  try {
    const config = {
      service: "gmail",
      auth: {
        user: "jaideeppatidar3421@gmail.com",
        pass: "kljp uypu xzlf ldrh",
      },
    };

    const transporter = nodemailer.createTransport(config);
    const mailOptions = await transporter.sendMail({
      from: '"hireflex247 Pvt Ltd " <jaideeppatidar3421@gmail.com>',
      to: user.email,
      subject: "Your Employee ID and Login Details",
      html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
                  <h2>Welcome to Our Company!</h2>
                  <p>Dear ${user.firstName}</p>
                  <p>We are pleased to welcome you to the company. Below are your login details:</p>
                  <p>Your one-time password (OTP) for email verification is:</p>
                  <h3>${otp}</h3>
                  <ul>
                    // <li><strong>Employee ID:</strong> ${user.userId}</li>
                    // <li><strong>Email:</strong> ${user.email}</li>
                    
                  </ul>
                  <p>Please keep this information secure.</p>
                  <p>Best regards,</p>
                  <p>Geet Agro Multitrade LLP Company</p>
                </div>
            `,
      attachments: [
        {
          filename: "GAMTLLP.png",
          path: "./img/logo.png",
          cid: "logo",
        },
      ],
    });

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendWelcomeEmail, generateOTP };
