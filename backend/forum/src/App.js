const express = require("express");
const cors = require('cors');
const Router = require("./routes/userRoutes")

const app = express();

app.use(cors()); // setup cross origin resource sharing

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(Router);

// Enable cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// Setup server port
var port = process.env.PORT || 3030;

app.listen(port, err => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	require('./loaders/dbLoader');
	console.log(`Server is running at port ${port}`);
});

module.exports = app;