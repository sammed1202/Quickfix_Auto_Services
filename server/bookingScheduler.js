// utils/bookingScheduler.js
import cron from "node-cron";
import nodemailer from "nodemailer";
import Booking from "./models/Booking.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailToUser = async (email, vehicleName) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "No response from shop",
    html: `<p>We're sorry! The shop hasn't responded to your booking for <strong>${vehicleName}</strong> within 3 hours. You may try booking another shop from QuickFix.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email send error:", err);
  }
};

export const monitorBookingResponses = () => {
  cron.schedule("*/15 * * * *", async () => {
    const now = new Date();
    const threshold = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    const bookings = await Booking.find({
      status: "Pending",
      createdAt: { $lte: threshold },
      emailSentForNoResponse: false, 
    });
    const unresponded = await Booking.find({
      createdAt: { $lte: threshold },
      status: "Pending",
      emailSentForNoResponse: false, 
    }).populate("user", "email firstName");

    for (const booking of unresponded) {
      if (!booking.statusDetails || !booking.statusDetails.notified) {
        await sendEmailToUser(booking.user.email, booking.vehicleName);
        booking.emailSentForNoResponse = true;
        booking.statusDetails = {
          ...booking.statusDetails,
          notified: true,
        };
        await booking.save();
      }
    }
  });
};
