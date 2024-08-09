const express = require("express");
const {
  getUserLatestTweet,
  getUserLatestTweetFeed,
  randomUserLatestTweet,
} = require("../controllers/userTweetController");

const router = express.Router();

router.get("/latest-tweet/:username", getUserLatestTweet);
router.get("/latest-tweet/:username/feed", getUserLatestTweetFeed);
router.get("/random/user-latest", randomUserLatestTweet);

module.exports = router;
