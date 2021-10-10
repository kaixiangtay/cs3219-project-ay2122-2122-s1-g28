// config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  EMAIL: process.env.EMAIL,
  OAUTH_URL: process.env.OAUTH_URL,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  RESET_PASSWORD_TOKEN_KEY: process.env.RESET_PASSWORD_TOKEN_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
