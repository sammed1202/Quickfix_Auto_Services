import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const bookingDir = "uploads/bookings";
if (!fs.existsSync(bookingDir)) fs.mkdirSync(bookingDir, { recursive: true });

const bookingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, bookingDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `booking-${Date.now()}-${file.fieldname}${ext}`);
  },
});

const bookingFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

export const bookingUpload = multer({
  storage: bookingStorage,
  fileFilter: bookingFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
