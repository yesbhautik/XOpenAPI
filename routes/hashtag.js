const express = require("express");
const {
  getHashtagTweets,
  getHashtagTweetsFeed,
  randomHashtagTweets,
} = require("../controllers/hashtagController");

const router = express.Router();

router.get("/hashtag/:keyword", getHashtagTweets);
router.get("/hashtag/:keyword/feed", getHashtagTweetsFeed);
router.get("/random/hashtag", randomHashtagTweets);

module.exports = router;
