const express = require("express");
const {
  searchTweets,
  searchTweetsFeed,
} = require("../controllers/searchController");

const router = express.Router();

router.get("/search/:keyword", searchTweets);
router.get("/search/:keyword/feed", searchTweetsFeed);

module.exports = router;
