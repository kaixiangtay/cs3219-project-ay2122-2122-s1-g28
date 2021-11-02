// config.js
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.CHAT_PORT;

// eslint-disable-next-line import/prefer-default-export
export { PORT };
