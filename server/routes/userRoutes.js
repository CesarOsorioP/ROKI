const express = require('express');
const router = express.Router();
const { likeSong, getUserLikedSongs, getUserInfo } = require('../controllers/userController');

router.put('/like/:userId/:songId', likeSong);
router.get('/:userId/liked-songs', getUserLikedSongs);
router.get('/:userId', getUserInfo);

module.exports = router;
