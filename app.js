const express = require("express");
const { port } = require("./config/config");
const app = express();

const searchRoutes = require("./routes/search");
const profileInfoRoutes = require("./routes/profile-info");
const strictSearchRoutes = require("./routes/strict-search");
const hashtagRoutes = require("./routes/hashtag");
const usernameLatestRoutes = require("./routes/username-latest");

app.set("view engine", "ejs");

app.use(searchRoutes);
app.use(profileInfoRoutes);
app.use(strictSearchRoutes);
app.use(hashtagRoutes);
app.use(usernameLatestRoutes);

app.get("/", (req, res) => {
  const routes = [
    { path: "/search/alonmusk", label: "Search Tweets" },
    { path: "/search/alonmusk/feed", label: "Search Tweets Feed" },
    { path: "/strict-search/alonmusk", label: "Strict Search Tweets" },
    {
      path: "/strict-search/alonmusk/feed",
      label: "Strict Search Tweets Feed",
    },
    { path: "/hashtag/alonmusk", label: "Hashtag Tweets" },
    { path: "/hashtag/alonmusk/feed", label: "Hashtag Tweets Feed" },
    {
      path: "/profile-information/alonmusk",
      label: "User Profile Information",
    },
    {
      path: "/profile-information/alonmusk/feed",
      label: "User Profile Information Feed",
    },
    { path: "/latest-tweet/alonmusk", label: "User's Latest Tweet" },
    { path: "/latest-tweet/alonmusk/feed", label: "User's Latest Tweet Feed" },
  ];

  res.render("index", {
    title: "TwitterOpenAPI",
    description: "Explore the predefined API outputs:",
    routes,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
