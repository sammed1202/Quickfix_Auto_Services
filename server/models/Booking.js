import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopService",
    required: true,
  },
  vehicleName: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  towingNeeded: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      "Pending",
      "Approved",
      "Scheduled",
      "Rejected",
      "Cancelled",
      "Replaced",
    ],
    default: "Pending",
  },
  scheduledTime: { type: String }, // Optional for scheduled approval
  rejectionMessage: { type: String }, // Optional for rejection

  statusDetails: {
    message: String, // like "Approved", "Scheduled at 3 PM", "Rejected: not available"
  },
  seenByShop: {
    type: Boolean,
    default: false,
  },
  seenByUser: {
    type: Boolean,
    default: false,
  },
  emailSentForNoResponse: {
    type: Boolean,
    default: false,
  },
  paymentImage: {
    type: String, // ✅ <-- Add this field
  },
  adminCommission: {
    type: Number,
    default: 0,
  },
  shopOwnerEarning: {
    type: Number,
    default: 0,
  },
  userLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
