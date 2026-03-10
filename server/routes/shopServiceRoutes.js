import express from "express";
import { createBooking, createOrUpdateShop, getAllShops, getMyShop, getNearbyShops, getOldBookings, getReviews, getShopBookings, getShopById, getShopReviews, getTodaysBookings, postReview, updateBookingStatus } from "../controller/shopServiceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/multerConfig.js";
import { bookingUpload } from "../config/bookingmulter.js";
import ShopService from "../models/ShopServiceModel.js";


const router = express.Router();
router.get('/oldbookings', protect, getOldBookings);
router.get('/todaysbookings', protect, getTodaysBookings);
router.post("/book", protect, bookingUpload.single("image"),createBooking);
router.get("/nearby", protect, getNearbyShops);
router.get("/my",protect, getMyShop);
router.get("/mybookings", protect, getShopBookings);
router.get("/",protect, getAllShops);
router.post("/", protect, upload.array("photos", 5), createOrUpdateShop);
router.patch("/booking/:id/status", protect, updateBookingStatus);
router.get("/:id",protect, getShopById);
router.get("/review/:shopId", protect, getShopReviews);
// Example Express route
router.post("/:shopId/review", protect, async (req, res) => {
  const { shopId } = req.params;
  const { rating, comment } = req.body;

  const shop = await ShopService.findById(shopId);

  const alreadyReviewed = shop.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: "You already reviewed this shop." });
  }

  shop.reviews.push({
    user: req.user._id,
    rating,
    comment,
  });

  await shop.save();

  res.json({ message: "Review submitted!" });
});


export default router;
