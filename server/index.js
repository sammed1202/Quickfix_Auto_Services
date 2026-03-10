import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import userRouter from "./routes/UserRoute.js";
import contactRouter from "./routes/ContactRouter.js";
import adminRouter from "./routes/AdminRouter.js";
import shopRouter from "./routes/shopServiceRoutes.js";
import { monitorBookingResponses } from "./bookingScheduler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',   
  credentials: true,                
}));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/propertyImages", express.static("propertyImages"));

// MongoDB Connection
mongoose.connect(URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    monitorBookingResponses();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // exit the app on DB failure
  });


// ---------------------- FILE UPLOAD: General ----------------------
const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const generalStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: generalStorage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });

  const filePath = path.join("uploads", req.file.filename);
  res.status(200).json({ message: "✅ File uploaded successfully", filePath });
});

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("❌ File download error:", err);
      res.status(404).send("File not found");
    }
  });
});

// ---------------------- FILE UPLOAD: Property Images ----------------------
const propertyImgDir = path.join(path.resolve(), "propertyImages");
if (!fs.existsSync(propertyImgDir)) fs.mkdirSync(propertyImgDir, { recursive: true });

const propImgStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, propertyImgDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const propImgUpload = multer({ storage: propImgStorage });

app.post("/propertyImages", propImgUpload.single("propImg1"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please upload a valid image." });

    const filePath = path.join("propertyImages", req.file.filename);
    res.status(200).json({ filePath });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ---------------------- Routes ----------------------
app.use("/user", userRouter);
app.use("/contact", contactRouter);
app.use("/admin", adminRouter);
app.use("/api/shop", shopRouter);

// 404 Handler
app.use((req, res) => {
  console.warn("⚠️ Route not found:", req.originalUrl);
  res.status(404).json({ message: "404 - Page not found." });
});
