const express = require("express");
const {
  getHashtagTweets,
  getHashtagTweetsFeed,
} = require("../controllers/hashtagController");

const router = express.Router();

router.get("/hashtag/:keyword", getHashtagTweets);
router.get("/hashtag/:keyword/feed", getHashtagTweetsFeed);

module.exports = router;
