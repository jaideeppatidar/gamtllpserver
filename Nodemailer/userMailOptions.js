const nodemailer = require("nodemailer");

// Email sending function
const sendBookingEmails = async (bookingDetails) => {
  try {
    const config = {
      service: "gmail",
      auth: {
        user: "jaideeppatidar3421@gmail.com",
        pass: "kljp uypu xzlf ldrh",
      },
    };

    const transporter = nodemailer.createTransport(config);

    // Send email to user
    const userMailOptions = {
      from: '"Geet Agro Multitrade LLP" <jaideeppatidar3421@gmail.com>',
      to: bookingDetails.userEmail, // Make sure userEmail exists in bookingDetails
      subject: "Product Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
          <h2>Booking Confirmation</h2>
          <p>Dear ${bookingDetails.firstName},</p>
          <p>Your product booking has been successfully confirmed!</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Product:</strong> ${bookingDetails.title}</p>
            <p><strong>Booking Date:</strong> ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
          </div>

          <div style="margin: 30px 0;">
            <a href="https://gamtllp.com/auth-login" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Login to Your Account
            </a>
          </div>

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
    };

    // Send email to company
    const companyMailOptions = {
      from: '"Geet Agro Multitrade LLP" <jaideeppatidar3421@gmail.com>',
      to: "jaideeppatidar3421@gmail.com",
      subject: "New Product Booking Notification",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
          <h2>New Booking Alert</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>User ID:</strong> ${bookingDetails.userId}</p>
            <p><strong>Customer Name:</strong> ${bookingDetails.firstName}</p>
            <p><strong>Product:</strong> ${bookingDetails.title}</p>
            <p><strong>Income:</strong> ${bookingDetails.income}</p>
            <p><strong>Booking Date:</strong> ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
            ${bookingDetails.image ? `<img src="${bookingDetails.image}" alt="Product Image" style="max-width: 200px; margin: 10px 0;">` : ''}
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "GAMTLLP.png",
          path: "./img/logo.png",
          cid: "logo",
        },
      ],
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(companyMailOptions)
    ]);

    console.log("Booking notification emails sent successfully");
  } catch (error) {
    console.error("Error sending booking emails:", error);
    throw new Error("Failed to send booking notification emails");
  }
};

module.exports = { sendBookingEmails };
