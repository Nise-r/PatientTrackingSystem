const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Adjust path based on your project structure

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './'); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Accept only these file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

// Update User Profile Picture
const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params; // User ID from route parameters
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update profile picture URL
    user.profilePicture = `/uploads/profilePictures/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export upload middleware and controller
module.exports = {
  uploadMiddleware: upload.single('profilePicture'), // Single file upload
  updateProfilePicture,
};
