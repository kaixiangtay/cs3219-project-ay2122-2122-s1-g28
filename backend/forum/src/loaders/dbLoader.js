const mongoose = require("mongoose");
const { endpoint } = require('../config/config')

const username = "user"; //username for admin
const password = "users123"; //password for admin
const cluster = "Cluster0"; //cluster number
const dbname = "UserDatabase"; //database name for users

mongoose.Promise = global.Promise;

// const connectionURL = "mongodb+srv://user:users123@cluster0.xfyg0.mongodb.net/UserDatabase?retryWrites=true&w=majority";

const connection = mongoose.connect(endpoint,   {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

connection
	.then(db => {
		console.log("Database connection successful");
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log("Attempting to re-establish database connection");
			mongoose.connect(endpoint);
		} else {
			console.log("Database connection error");
		}
	});

module.exports = connection;