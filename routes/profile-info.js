const express = require("express");
const {
  getProfileInfo,
  getProfileInfoFeed,
} = require("../controllers/profileInfoController");

const router = express.Router();

router.get("/profile-information/:username", getProfileInfo);
router.get("/profile-information/:username/feed", getProfileInfoFeed);

module.exports = router;
