const express = require("express");
const { port, slurl } = require("./config/config");
const { exec } = require("child_process");

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
  res.send(`
    <h1>Welcome to the XOpenAPI.</h1>
    <p>Get URL generator & examples at <a href="${slurl}" target="_blank">${slurl}</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
