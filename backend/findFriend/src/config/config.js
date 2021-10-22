// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
}
