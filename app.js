const express = require("express");
const searchRoutes = require("./routes/search");
const profileInfoRoutes = require("./routes/profile-info");
const strictSearchRoutes = require("./routes/strict-search");
const hashtagRoutes = require("./routes/hashtag");
const usernameLatestRoutes = require("./routes/username-latest");
const { port } = require("./config/config");

const app = express();

app.use(searchRoutes);
app.use(profileInfoRoutes);
app.use(strictSearchRoutes);
app.use(hashtagRoutes);
app.use(usernameLatestRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
