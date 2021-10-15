// config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,

  GCP_CLIENT_ID: process.env.GCP_CLIENT_ID,
  GCP_CLIENT_SECRET: process.env.GCP_CLIENT_SECRET,
  GCP_REFRESH_TOKEN: process.env.GCP_REFRESH_TOKEN,
  GCP_ACCESS_TOKEN: process.env.GCP_ACCESS_TOKEN,
  EMAIL: process.env.EMAIL,
  OAUTH_URL: process.env.OAUTH_URL,
  
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_RESET_PASSWORD_TOKEN: process.env.JWT_RESET_PASSWORD_TOKEN,
  
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
};