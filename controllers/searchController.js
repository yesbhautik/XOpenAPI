const { Rettiwt } = require("rettiwt-api");
const RSS = require("rss");
const { apiKey } = require("../config/config");

const rettiwt = new Rettiwt({ apiKey });

exports.searchTweets = async (req, res) => {
  const { keyword } = req.params;
  try {
    const tweets = await rettiwt.tweet.search({
      includeWords: [keyword],
      count: 1,
      result_type: "recent",
      language: "en",
      // minLikes: 1000,
      // minReplies: 100,
      // minRetweets: 100,
    });

    if (!tweets.list || tweets.list.length === 0) {
      throw new Error("No tweets found");
    }

    const tweet = tweets.list[0];

    res.json({
      keyword,
      latestTweet: {
        id: tweet.id,
        createdAt: tweet.createdAt,
        tweetBy: {
          id: tweet.tweetBy.id,
          userName: tweet.tweetBy.userName,
          fullName: tweet.tweetBy.fullName,
          createdAt: tweet.tweetBy.createdAt,
          description: tweet.tweetBy.description,
          isVerified: tweet.tweetBy.isVerified,
          likeCount: tweet.tweetBy.likeCount,
          followersCount: tweet.tweetBy.followersCount,
          followingsCount: tweet.tweetBy.followingsCount,
          statusesCount: tweet.tweetBy.statusesCount,
          location: tweet.tweetBy.location,
          profileBanner: tweet.tweetBy.profileBanner,
          profileImage: tweet.tweetBy.profileImage,
        },
        entities: {
          hashtags: tweet.entities.hashtags,
          mentionedUsers: tweet.entities.mentionedUsers.map(
            (user) => user.userName
          ),
          urls: tweet.entities.urls,
        },
        media: tweet.media
          ? tweet.media.map((media) => ({
              type: media.type,
              url: media.url,
            }))
          : [],
        fullText: tweet.fullText,
        tweetURL: `https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}`,
        lang: tweet.lang,
        quoteCount: tweet.quoteCount,
        replyCount: tweet.replyCount,
        retweetCount: tweet.retweetCount,
        likeCount: tweet.likeCount,
        viewCount: tweet.viewCount,
        bookmarkCount: tweet.bookmarkCount,
      },
    });
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
    res.status(500).json({ error: error.message, details: error.details });
  }
};

exports.searchTweetsFeed = async (req, res) => {
  const { keyword } = req.params;
  try {
    const tweets = await rettiwt.tweet.search({
      includeWords: [keyword],
      count: 1,
      result_type: "recent",
      language: "en",
      // minLikes: 1000,
      // minReplies: 100,
      // minRetweets: 100,
    });

    if (!tweets.list || tweets.list.length === 0) {
      throw new Error("No tweets found");
    }

    const feed = new RSS({
      title: `Latest Tweet for keyword: ${keyword}`,
      description: `Latest tweet for keyword: ${keyword}`,
      feed_url: `http://localhost:${process.env.PORT}/search/${keyword}/feed`,
      site_url: `http://localhost:${process.env.PORT}`,
    });

    const tweet = tweets.list[0];
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
      <p><strong>Tweet URL:</strong> https://twitter.com/${
        tweet.tweetBy.userName
      }/status/${tweet.id}</p>
      <p><strong>Language:</strong> ${tweet.lang}</p>
      <p><strong>Quote Count:</strong> ${tweet.quoteCount}</p>
      <p><strong>Reply Count:</strong> ${tweet.replyCount}</p>
      <p><strong>Retweet Count:</strong> ${tweet.retweetCount}</p>
      <p><strong>Like Count:</strong> ${tweet.likeCount}</p>
      <p><strong>View Count:</strong> ${tweet.viewCount}</p>
      <p><strong>Bookmark Count:</strong> ${tweet.bookmarkCount}</p>
    `;
    feed.item({
      title: `Tweet by ${tweet.tweetBy.fullName}`,
      description: tweetDescription,
      url: `https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}`,
      guid: tweet.id,
      date: tweet.createdAt,
    });

    res.set("Content-Type", "application/rss+xml");
    res.send(feed.xml({ indent: true }));
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
    res.status(500).json({ error: error.message, details: error.details });
  }
};
