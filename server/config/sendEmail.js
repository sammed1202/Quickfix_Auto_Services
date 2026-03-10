import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log("📨 sendEmail.js loaded");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
};

export default sendEmail;
