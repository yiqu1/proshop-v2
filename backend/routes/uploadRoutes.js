import express from "express";
import path from "path";
// middleware for handling file uploads
import multer from "multer";
const router = express.Router();

// parses incoming multipart/form-data requests and stores uploaded file on your server.
const storage = multer.diskStorage({
  // tells multer where to save files (uploads/ folder)
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  // how to name the file (uploads/image-1728394732.png)
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Optional file type filter
function checkFileType(file, cb) {
  // ensures only .jpg, .jpeg, .png are accepted.
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

// Initialize multer, Creates the middleware using custom storage.
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// handles one file under form field name "image"; Once uploaded, multer adds req.file to the request.
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
