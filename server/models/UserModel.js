import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other","not-specified"],
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  matitalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed","single"],
  },
  role: {
    type: String,
    enum: ["Admin", "User", "ShopOwner"],
    default: "User",
  },
    userStatus: {
    type: String,
    enum: ["Active", "Inactive", "Pending", "Approved"],
    default: "Active", 
  },
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
