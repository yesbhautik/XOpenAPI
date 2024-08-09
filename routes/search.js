const express = require("express");
const {
  searchTweets,
  searchTweetsFeed,
  randomSearchTweets,
} = require("../controllers/searchController");

const router = express.Router();

router.get("/search/:keyword", searchTweets);
router.get("/search/:keyword/feed", searchTweetsFeed);
router.get("/random/search", randomSearchTweets);

module.exports = router;
