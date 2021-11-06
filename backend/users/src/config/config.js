// config.js
import dotenv from "dotenv";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.USERS_BACKEND_URL;
const DB_URL = process.env.USERS_DB_URL;
const PORT = process.env.USERS_PORT;

const GCP_CLIENT_ID = process.env.GCP_CLIENT_ID;
const GCP_CLIENT_SECRET = process.env.GCP_CLIENT_SECRET;
const GCP_REFRESH_TOKEN = process.env.GCP_REFRESH_TOKEN;
const GCP_ACCESS_TOKEN = process.env.GCP_ACCESS_TOKEN;
const EMAIL = process.env.EMAIL;

const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;

const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;

export {
	FRONTEND_URL,
	BACKEND_URL,
	DB_URL,
	PORT,
	GCP_CLIENT_ID,
	GCP_CLIENT_SECRET,
	GCP_REFRESH_TOKEN,
	GCP_ACCESS_TOKEN,
	EMAIL,
	JWT_ACCESS_TOKEN,
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET_NAME,
	S3_BUCKET_REGION,
};
