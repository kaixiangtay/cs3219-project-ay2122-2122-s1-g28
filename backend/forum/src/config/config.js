// config.js
import dotenv from "dotenv";

dotenv.config();

// dotenv.config();

const DB_URL = process.env.FORUM_DB_URL;
const PORT = process.env.FORUM_PORT;
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;

export { DB_URL, PORT, JWT_ACCESS_TOKEN };
