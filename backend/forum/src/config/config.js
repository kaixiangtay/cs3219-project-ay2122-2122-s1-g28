// config.js
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
}