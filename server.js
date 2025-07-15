const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ dest: "uploads/" }); // Save in uploads folder

// da file route
app.get("/uploads/:filename", (req, res) => {
  const file = path.join(__dirname, "uploads", req.params.filename);
  res.download(file); // force download
});

// LATER NI- (ck)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  res.json({ link: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
