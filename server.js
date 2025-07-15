const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Folder to store uploaded files
const upload = multer({ dest: "uploads/" });

// Static serving for download
app.get("/uploads/:filename", (req, res) => {
  const file = path.join(__dirname, "uploads", req.params.filename);
  res.download(file); // force download
});

// Upload handler
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }
  res.json({ link: `/uploads/${req.file.filename}` });
});

// Serve test page for iframe status
app.get("/", (req, res) => {
  res.send("<h2>🟢 TransferNest Server is Online</h2>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🐣 TransferNest server running on port ${PORT}`);
});

