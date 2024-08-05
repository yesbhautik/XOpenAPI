const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apiKey: process.env.T_API,
  port: process.env.PORT || 3000,
  language: process.env.LANGUAGE || "en",
  minLikes: parseInt(process.env.MIN_LIKES),
  minReplies: parseInt(process.env.MIN_REPLIES),
  minRetweets: parseInt(process.env.MIN_RETWEETS),
};
