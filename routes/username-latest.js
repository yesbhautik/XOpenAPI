const express = require("express");
const {
  getUserLatestTweet,
  getUserLatestTweetFeed,
} = require("../controllers/userTweetController");

const router = express.Router();

router.get("/latest-tweet/:username", getUserLatestTweet);
router.get("/latest-tweet/:username/feed", getUserLatestTweetFeed);

module.exports = router;
