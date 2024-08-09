const { Rettiwt } = require("rettiwt-api");
const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const {
  apiKey,
  language,
  minLikes,
  minReplies,
  minRetweets,
} = require("../config/config");

const rettiwt = new Rettiwt({ apiKey });

exports.getUserLatestTweet = async (req, res) => {
  const { username } = req.params;
  const { minLikes, minReplies, minRetweets, language } = req.query;

  try {
    // Fetch the details of the user
    const userDetails = await rettiwt.user.details(username);

    // Log the user details to debug
    console.log("User Details:", JSON.stringify(userDetails, null, 2));

    // Fetch the user's latest tweets using the search method
    const userTweets = await rettiwt.tweet.search({
      fromUsers: [userDetails.userName],
      count: 1,
      result_type: "recent",
      language: language || "en",
      minLikes: parseInt(minLikes, 10) || 0,
      minReplies: parseInt(minReplies, 10) || 0,
      minRetweets: parseInt(minRetweets, 10) || 0,
    });

    // Log the user's tweets to debug
    console.log("User Tweets:", JSON.stringify(userTweets, null, 2));

    // Check if userTweets.list is defined
    if (!userTweets.list || userTweets.list.length === 0) {
      throw new Error("No tweets found");
    }

    // Return the structured JSON response
    res.json({
      userDetails,
      latestTweet: userTweets.list[0],
      latestTweetURL: `https://twitter.com/${userDetails.userName}/status/${userTweets.list[0].id}`,
    });
  } catch (error) {
    console.error("Error fetching latest tweet:", error.message);
    if (error.details) {
      console.error("Error details:", JSON.stringify(error.details, null, 2));
    }
    res.status(500).json({ error: error.message, details: error.details });
  }
};

exports.getUserLatestTweetFeed = async (req, res) => {
  const { username } = req.params;
  const { minLikes, minReplies, minRetweets, language } = req.query;

  try {
    // Fetch the details of the user
    const userDetails = await rettiwt.user.details(username);

    // Log the user details to debug
    console.log("User Details:", JSON.stringify(userDetails, null, 2));

    // Fetch the user's latest tweets using the search method
    const userTweets = await rettiwt.tweet.search({
      fromUsers: [userDetails.userName],
      count: 1,
      result_type: "recent",
      language: language || "en",
      minLikes: parseInt(minLikes, 10) || 0,
      minReplies: parseInt(minReplies, 10) || 0,
      minRetweets: parseInt(minRetweets, 10) || 0,
    });

    // Log the user's tweets to debug
    console.log("User Tweets:", JSON.stringify(userTweets, null, 2));

    // Check if userTweets.list is defined
    if (!userTweets.list || userTweets.list.length === 0) {
      throw new Error("No tweets found");
    }

    // Create a new RSS feed
    const feed = new RSS({
      title: `Latest Tweet from @${userDetails.userName}`,
      description: `Latest tweet from @${userDetails.userName}`,
      feed_url: `http://localhost:${process.env.PORT}/latest-tweet/${username}/feed`,
      site_url: `http://localhost:${process.env.PORT}`,
    });

    const tweet = userTweets.list[0];
    const tweetDescription = `
      <p><strong>Tweet ID:</strong> ${tweet.id}</p>
      <p><strong>Created At:</strong> ${tweet.createdAt}</p>
      <p><strong>Tweet By:</strong></p>
      <ul>
        <li><strong>ID:</strong> ${tweet.tweetBy.id}</li>
        <li><strong>Username:</strong> ${tweet.tweetBy.userName}</li>
        <li><strong>Full Name:</strong> ${tweet.tweetBy.fullName}</li>
        <li><strong>Created At:</strong> ${tweet.tweetBy.createdAt}</li>
        <li><strong>Description:</strong> ${tweet.tweetBy.description}</li>
        <li><strong>Is Verified:</strong> ${tweet.tweetBy.isVerified}</li>
        <li><strong>Like Count:</strong> ${tweet.tweetBy.likeCount}</li>
        <li><strong>Followers Count:</strong> ${
          tweet.tweetBy.followersCount
        }</li>
        <li><strong>Followings Count:</strong> ${
          tweet.tweetBy.followingsCount
        }</li>
        <li><strong>Statuses Count:</strong> ${tweet.tweetBy.statusesCount}</li>
        <li><strong>Location:</strong> ${tweet.tweetBy.location}</li>
        <li><strong>Profile Banner:</strong> <img src="${
          tweet.tweetBy.profileBanner
        }" alt="Profile Banner"></li>
        <li><strong>Profile Image:</strong> <img src="${
          tweet.tweetBy.profileImage
        }" alt="Profile Image"></li>
      </ul>
      <p><strong>Entities:</strong></p>
      <ul>
        <li><strong>Hashtags:</strong> ${tweet.entities.hashtags.join(
          ", "
        )}</li>
        <li><strong>Mentions:</strong> ${tweet.entities.mentionedUsers
          .map((user) => user.userName)
          .join(", ")}</li>
        <li><strong>URLs:</strong> ${tweet.entities.urls.join(", ")}</li>
      </ul>
      <p><strong>Media:</strong></p>
      <ul>
        ${
          tweet.media
            ? tweet.media
                .map(
                  (media) =>
                    `<li><strong>Type:</strong> ${media.type}, <strong>URL:</strong> <a href="${media.url}">${media.url}</a></li>`
                )
                .join("")
            : "<li>No media</li>"
        }
      </ul>
      <p><strong>Full Text:</strong> ${tweet.fullText}</p>
      <p><strong>Language:</strong> ${tweet.lang}</p>
      <p><strong>Latest Tweet URL:</strong> https://twitter.com/${
        userDetails.userName
      }/status/${tweet.id}</p>
      <p><strong>Quote Count:</strong> ${tweet.quoteCount}</p>
      <p><strong>Reply Count:</strong> ${tweet.replyCount}</p>
      <p><strong>Retweet Count:</strong> ${tweet.retweetCount}</p>
      <p><strong>Like Count:</strong> ${tweet.likeCount}</p>
      <p><strong>View Count:</strong> ${tweet.viewCount}</p>
      <p><strong>Bookmark Count:</strong> ${tweet.bookmarkCount}</p>
    `;
    feed.item({
      title: `Tweet by ${userDetails.fullName}`,
      description: tweetDescription,
      url: `https://twitter.com/${userDetails.userName}/status/${tweet.id}`,
      guid: tweet.id,
      date: tweet.createdAt,
    });

    // Set the content type to application/rss+xml
    res.set("Content-Type", "application/rss+xml");
    // Send the RSS feed as the response
    res.send(feed.xml({ indent: true }));
  } catch (error) {
    console.error("Error fetching latest tweet:", error.message);
    if (error.details) {
      console.error("Error details:", JSON.stringify(error.details, null, 2));
    }
    res.status(500).json({ error: error.message, details: error.details });
  }
};

exports.randomUserLatestTweet = async (req, res) => {
  const { minLikes, minReplies, minRetweets, language } = req.query;

  try {
    const keywordsPath = path.join(__dirname, "../keywords.json");
    const keywordsData = fs.readFileSync(keywordsPath);
    const users = JSON.parse(keywordsData).users;
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Fetch the details of the random user
    const userDetails = await rettiwt.user.details(randomUser);

    // Log the user details to debug
    console.log("User Details:", JSON.stringify(userDetails, null, 2));

    // Fetch the user's latest tweets using the search method
    const userTweets = await rettiwt.tweet.search({
      fromUsers: [userDetails.userName],
      count: 1,
      result_type: "recent",
      language: language || "en",
      minLikes: parseInt(minLikes, 10) || 0,
      minReplies: parseInt(minReplies, 10) || 0,
      minRetweets: parseInt(minRetweets, 10) || 0,
    });

    // Log the user's tweets to debug
    console.log("User Tweets:", JSON.stringify(userTweets, null, 2));

    // Check if userTweets.list is defined
    if (!userTweets.list || userTweets.list.length === 0) {
      throw new Error("No tweets found");
    }

    // Return the structured JSON response
    res.json({
      userDetails,
      latestTweet: userTweets.list[0],
      latestTweetURL: `https://twitter.com/${userDetails.userName}/status/${userTweets.list[0].id}`,
    });
  } catch (error) {
    console.error("Error fetching latest tweet:", error.message);
    if (error.details) {
      console.error("Error details:", JSON.stringify(error.details, null, 2));
    }
    res.status(500).json({ error: error.message, details: error.details });
  }
};
