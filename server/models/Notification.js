// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g., "booking-replaced"
    required: true,
  },
  relatedBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
