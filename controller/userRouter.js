const express = require('express');
const router = express.Router();
const { uploadMiddleware, updateProfilePicture } = require('./userController');

router.put('/users/:id/profile-picture', uploadMiddleware, updateProfilePicture);

module.exports = router;
