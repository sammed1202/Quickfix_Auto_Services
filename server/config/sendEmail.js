import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // change later after domain verification
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response);

    return response;
  } catch (error) {
    console.error("❌ Resend Error:", error);
    throw error;
  }
};

export default sendEmail;