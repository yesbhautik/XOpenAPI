const express = require("express");
const { port, baseurl } = require("./config/config");
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

// Start the Streamlit app
exec("streamlit run ./tools/urlCreator.py", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing Streamlit: ${err}`);
    return;
  }
  console.log(`Streamlit stdout: ${stdout}`);
  console.error(`Streamlit stderr: ${stderr}`);
});

// Add a new route to show the Streamlit URL
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the XOpenAPI.</h1>
    <p>Get URL generator & examples at <a href="${baseurl}" target="_blank">${baseurl}</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
