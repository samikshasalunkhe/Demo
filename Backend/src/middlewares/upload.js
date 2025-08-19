// import multer from "multer";

// // memory storage so we can send buffer to Cloudinary
// const storage = multer.memoryStorage();
// export const uploadMemory = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });



import multer from "multer";
import path from "path";

// कुठे save करायचं
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 📂 uploads नावाचा folder बनव
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// फक्त काही specific file प्रकार allow करू
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("⚠️ Only images and PDF allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
