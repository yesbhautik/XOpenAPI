const { Rettiwt } = require("rettiwt-api");
const RSS = require("rss");
const { apiKey } = require("../config/config");

const rettiwt = new Rettiwt({ apiKey });

exports.getProfileInfo = async (req, res) => {
  const { username } = req.params;
  try {
    const userDetails = await rettiwt.user.details(username);

    console.log("User Details:", JSON.stringify(userDetails, null, 2));

    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: error.message, details: error.details });
  }
};

exports.getProfileInfoFeed = async (req, res) => {
  const { username } = req.params;
  try {
    const userDetails = await rettiwt.user.details(username);

    console.log("User Details:", JSON.stringify(userDetails, null, 2));

    const feed = new RSS({
      title: `Profile Information of @${userDetails.userName}`,
      description: `Profile information of @${userDetails.userName}`,
      feed_url: `http://localhost:${process.env.PORT}/profile-information/${username}/feed`,
      site_url: `http://localhost:${process.env.PORT}`,
    });

    const userDescription = `
      <p><strong>ID:</strong> ${userDetails.id}</p>
      <p><strong>Username:</strong> ${userDetails.userName}</p>
      <p><strong>Full Name:</strong> ${userDetails.fullName}</p>
      <p><strong>Created At:</strong> ${userDetails.createdAt}</p>
      <p><strong>Description:</strong> ${userDetails.description}</p>
      <p><strong>Is Verified:</strong> ${userDetails.isVerified}</p>
      <p><strong>Like Count:</strong> ${userDetails.likeCount}</p>
      <p><strong>Followers Count:</strong> ${userDetails.followersCount}</p>
      <p><strong>Followings Count:</strong> ${userDetails.followingsCount}</p>
      <p><strong>Statuses Count:</strong> ${userDetails.statusesCount}</p>
      <p><strong>Location:</strong> ${userDetails.location}</p>
      <p><strong>Profile Banner:</strong> <img src="${userDetails.profileBanner}" alt="Profile Banner"></p>
      <p><strong>Profile Image:</strong> <img src="${userDetails.profileImage}" alt="Profile Image"></p>
    `;
    feed.item({
      title: `Profile of ${userDetails.fullName}`,
      description: userDescription,
      url: `https://twitter.com/${userDetails.userName}`,
      guid: userDetails.id,
      date: userDetails.createdAt,
    });

    res.set("Content-Type", "application/rss+xml");
    res.send(feed.xml({ indent: true }));
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: error.message, details: error.details });
  }
};
