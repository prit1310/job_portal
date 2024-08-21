const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Route to handle the contact form submission
router.post('/contact', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, jobTitle, coverLetter } = req.body;
    const resumePath = req.file.path;

    // Save the contact information and job details to the database here

    res.status(200).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ message: 'Error submitting contact form', error: err.message });
  }
});

module.exports = router;
