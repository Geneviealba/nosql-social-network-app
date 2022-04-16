const express = require("express");
const mongooseConnect = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// This helps indicate what activity's server is running in the terminal but not neccessary for the Express server to function.
const activity = cwd.includes("Social API")
  ? cwd.split("/Social Network API/")[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongooseConnect.once("open", () => {
  app.listen(PORT, () => {
    console.log(
      `Connection for ${activity} is running on port localhost:${PORT} !`
    );
  });
});