import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    timings: { type: String, required: true },
    services: [serviceSchema],
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    photos: [{ type: String }],
    reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Virtual field for average rating


// Include virtuals in JSON and object outputs
shopSchema.set("toJSON", { virtuals: true });
shopSchema.set("toObject", { virtuals: true });

// Geospatial index
shopSchema.index({ coordinates: "2dsphere" });

// Prevent model overwrite
export default mongoose.models.ShopService ||
  mongoose.model("ShopService", shopSchema);
