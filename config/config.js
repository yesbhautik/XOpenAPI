const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apiKey: process.env.T_API,
  port: process.env.PORT || 3000,
};
