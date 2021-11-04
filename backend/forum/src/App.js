import express, { urlencoded, json } from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import Router from "./routes/forumRoutes.js";
import connection from "./loaders/dbLoader.js";

const app = express();

app.use(cors()); // setup cross origin resource sharing

app.use(
	urlencoded({
		extended: true,
	}),
);

app.use(json());

app.use(Router);

// Enable cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,PUT,POST,DELETE,PATCH,OPTIONS",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With",
	);
	next();
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	connection;
	console.log(`Server is running at PORT ${PORT}`);
});

export default app;
