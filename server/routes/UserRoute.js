import express from "express";
import {
  cancelBooking,
  changePassword,
  deleteUser,
  emailVerification,
  findAllUsers,
  findUser,
  forgotPassword,
  getallBooks,
  getBookingHistory,
  getMyBookings,
  loginUser,
  logoutUser,
  registerUser,
  spamChecker,
  updateUser,
  updateUserProfile,
} from "../controller/UserController.js";
import { protect } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/booking/history", protect, getBookingHistory);
userRouter.get("/booking/allhistory", protect, getallBooks);
userRouter.get("/bookings/my", protect, getMyBookings);
userRouter.post("/spam", spamChecker);
userRouter.post("/", registerUser);
userRouter.get("/", findAllUsers);
userRouter.post("/verifyEmail", emailVerification);
userRouter.put("/logout", protect, logoutUser);
userRouter.get("/:email", findUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/changePassword", protect, changePassword);
userRouter.put("/forgotPassword/:email", forgotPassword);
userRouter.delete("/bookings/:id", protect, cancelBooking);
userRouter.put("/profile/:userId", protect, updateUserProfile);


// Add this at the end
userRouter.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
export default userRouter;
