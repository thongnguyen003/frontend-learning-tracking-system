const express = require("express")
const cors = require("cors");
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], 
}));
const cloudinary = require("../../configs/cloudinary.js")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads',
  allowedFormats:['png','jpg','jpeg'],
});
const multer = require("multer")
const upload = multer({
    storage:storage
})
app.post('/upload', upload.fields([{name:'achievement',maxCount:"5"}]), (req, res) => {
  res.json({ message: 'File uploaded successfully', files: req.files });
});
app.listen(5000, () => console.log('Server is running on http://localhost:5000'));


