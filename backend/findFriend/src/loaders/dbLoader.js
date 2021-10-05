const mongoose = require("mongoose");
const { endpoint } = require('../config/config')

mongoose.Promise = global.Promise;

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
