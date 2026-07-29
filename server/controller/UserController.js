import sendEmail from "../config/sendEmail.js";
import bcrypt from "bcrypt";
import { verificationCodes } from "./CodeStore.js";
import { SpamUser } from "../models/SpamUser.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import Booking from "../models/Booking.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      role: role || "User",
      userStatus: role === "ShopOwner" ? "Pending" : "Active",
    });

    await newUser.save();
    await sendEmail({
      to: newUser.email,
      subject: "Welcome to our Services",
      html: `<div style='max-width:600px;margin:0 auto;font-family:Arial, sans-serif;'>
    <div style='background-color:#1e1e1e;color:#e0e0e0;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.3);'>
        <p style='font-size:22px;color:#4fc3f7;font-weight:500;margin-bottom:20px;'>Hello ${newUser.firstName}, Welcome to QuickFix,</p>

        <div style='background-color:#2d2d2d;border-left:4px solid #4fc3f7;padding:15px;margin-bottom:20px;border-radius:0 4px 4px 0;'>
            <div style='font-size:17px;line-height:1.6;'>

                <span style='color:#4fc3f7;font-weight:bold;font-size:19px;'>
                🔧 Welcome to QuickFix – Your Emergency Vehicle Buddy!
                </span>

                <p style='margin-top:15px;'>
                Dear ${newUser.firstName},<br>
                Thank you for registering with QuickFix! 🚗 We're excited to have you on board.
                </p>

                <p style='margin:15px 0;padding:10px;background:#252525;border-radius:4px;'>
                👉 With QuickFix, getting roadside help is now quick and reliable!
                </p>

                <p>Welcome to the QuickFix family! 🚀</p>

            </div>
        </div>

        <p><b>QuickFix Team</b></p>

    </div>
</div>`,
    });

    res.status(201).json({
      message:
        role === "ShopOwner"
          ? "Registration successful. Awaiting admin approval."
          : "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
  export const emailVerification = async (req, res) => {
    try {
      const { email } = req.body;
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      verificationCodes[email] = verificationCode;
      console.log(email);
      console.log(verificationCode);
      await verifyEmail(email, verificationCode);
      res.status(200).json({ verificationCode });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  export const verifyEmail = async (email, verificationCode) => {
    await sendEmail({
      to: email,
      subject: "Email verification code",
      html: `
      <p>Hello,</p>

      <p>Below is your verification code.</p>

      <h2>${verificationCode}</h2>

      <p>Best Regards,<br/>QuickFix</p>
    `,
    });
  };

  export const findAllUsers = async (req, res) => {
    try {
      return res.status(200).json(await User.find());
    } catch (error) {
      console.error("Error in finding User:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  export const findUser = async (req, res) => {
    try {
      const { email } = req.params;
      res.status(200).json(await User.findOne({ email }));
    } catch (error) {
      console.error("Error finding User:", error);
      res.status(500).json({ message: error.message });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error updating user", error);
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // ✅ Block ShopOwner if not approved
      if (user.role === "ShopOwner" && user.userStatus === "Pending") {
        return res.status(410).json({
          message: `Your account is currently '${user.userStatus}'. Please wait for admin approval.`,
        });
      }

      // ✅ Optional: update active status
      await User.findByIdAndUpdate(user._id, { userStatus: "Active" });

      const token = generateToken(user._id);

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userStatus: user.userStatus,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return res
          .status(450)
          .json({ message: "new password and confirm password didnt match" });
      }
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Entered old password is wrong" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const sendForgotPasswordEmail = async (user, password) => {
    await sendEmail({
      to: user.email,
      subject: "Temporary Password for Account Access",
      html: `
      <p>Hello ${user.firstName},</p>

      <p>Your temporary password is:</p>

      <h3>${password}</h3>

      <p>Please change it after logging in.</p>

      <p>Best Regards,<br/>QuickFix</p>
    `,
    });
  };

  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();
      const hashedPassword = await bcrypt.hash(randomNumber, 10);
      user.password = hashedPassword;
      await user.save();
      await sendForgotPasswordEmail(user, randomNumber);
      return res
        .status(200)
        .json({ message: "Temporary password sent to email" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };
  export const logoutUser = async (req, res) => {
    try {
      console.log("👤 User from token:", req.user);

      const user = req.user;
      user.userStatus = "Inactive";

      try {
        await user.save();
      } catch (saveError) {
        console.error("❌ Error while saving user:", saveError);
        return res
          .status(500)
          .json({ message: "Failed to save user", error: saveError.message });
      }

      res
        .status(200)
        .json({ message: "User logged out", status: user.userStatus });
    } catch (error) {
      console.error("❌ Outer error in logout:", error);
      res.status(500).json({ message: "Logout failed", error: error.message });
    }
  };

  export const spamChecker = async (req, res) => {
    try {
      const { email } = req.body;
      const spam = await SpamUser.find({ email });
      res.status(200).json(spam);
    } catch (error) {
      res.status(500).json({ message: "error in checking spam" });
    }
  };

  export const getMyBookings = async (req, res) => {
    try {
      console.log(req.user._id);

      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

      // Step 1: Get bookings in the last 3 hours
      const bookings = await Booking.find({
        user: req.user._id,
        createdAt: { $gte: threeHoursAgo },
      })
        .populate("shopId", "name location contact")
        .sort({ createdAt: -1 });

      const now = new Date();
      const latestBooking = bookings[0];

      // Step 2: Handle status updates for recent conflicting bookings
      if (latestBooking) {
        const createdAt = new Date(latestBooking.createdAt);
        const windowStart = new Date(createdAt.getTime() - 45 * 60 * 1000); // 45 mins window

        const cutoffBookings = bookings
          .slice(1)
          .filter(
            (b) =>
              b.status !== "Approved" &&
              b.status !== "Scheduled" &&
              b.status !== "Completed" &&
              b.status !== "Replaced" &&
              new Date(b.createdAt) >= windowStart,
          );

        for (const b of cutoffBookings) {
          if (!b.statusDetails?.message?.includes("User booked another shop")) {
            b.status = "Cancelled";
            b.statusDetails = {
              message: "User booked another shop after delay/rejection",
            };
            await b.save();
          }
        }
      }

      // Step 3: Mark unseen bookings as seen
      await Booking.updateMany(
        {
          user: req.user._id,
          seenByUser: false,
          createdAt: { $gte: threeHoursAgo },
        },
        { $set: { seenByUser: true } },
      );

      // Step 4: Refetch updated bookings
      const freshBookings = await Booking.find({
        user: req.user._id,
        createdAt: { $gte: threeHoursAgo },
      })
        .populate("shopId", "name location contact")
        .sort({ createdAt: -1 });

      console.log("✅ New bookings:", freshBookings);
      res.status(200).json(freshBookings);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      res
        .status(500)
        .json({ message: "Error fetching bookings", error: error.message });
    }
  };

  export const cancelBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (booking.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be cancelled" });
    }

    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking cancelled" });
  };

  export const getBookingHistory = async (req, res) => {
    try {
      console.log("userId ", req.user._id);
      const now = new Date();
      const threshold = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
      console.log("userId ", req.user._id);
      const historyBookings = await Booking.find({
        user: req.user._id,
        createdAt: { $lte: threshold },
      })
        .populate("shopId", "name location contact")
        .sort({ createdAt: -1 });

      res.status(200).json(historyBookings);
    } catch (err) {
      console.error("❌ Error fetching booking history:", err);
      res.status(500).json({ message: "Failed to fetch booking history" });
    }
  };

  export const getallBooks = async (req, res) => {
    try {
      res.status(200).json(await Booking.find());
    } catch (error) {
      res.status(500).json({ message: "internal server error", error: error });
    }
  };
  export const updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params; // Actually the email address
      const updates = req.body;

      // Optional: prevent changing protected fields
      delete updates.email;
      delete updates.role;
      delete updates.password;

      // Find user by email instead of ID
      const updatedUser = await User.findOneAndUpdate(
        { email: userId }, // Query by email
        updates,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
