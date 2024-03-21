const express = require('express');
const router = express.Router(); 
const cors = require('cors');
const multer = require('multer');
const { test, registerUser,loginUser } = require('../controllers/authController');
const fs = require('fs');

// middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173' 
  })
);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', test); // Assuming 'test' is a defined function

// Use the 'upload' middleware for the 'verifyNgo' route
router.post('/verifyNgo', upload.single('documents'), registerUser);
router.post('/login',loginUser);

module.exports = router;
