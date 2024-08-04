const express = require("express");
const {
  strictSearchTweets,
  strictSearchTweetsFeed,
} = require("../controllers/strictSearchController");

const router = express.Router();

router.get("/strict-search/:keyword", strictSearchTweets);
router.get("/strict-search/:keyword/feed", strictSearchTweetsFeed);

module.exports = router;
