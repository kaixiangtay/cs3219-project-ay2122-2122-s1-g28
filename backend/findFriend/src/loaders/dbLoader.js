import mongoose from "mongoose";
import { DB_URL } from "../config/config.js";

mongoose.Promise = global.Promise;

const connection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then((db) => {
    console.log("Database connection successful");
    return db;
  })
  .catch((err) => {
    if (err.message.code === "ETIMEDOUT") {
      console.log("Attempting to re-establish database connection");
      mongoose.connect(DB_URL);
    } else {
      console.log("Database connection error");
    }
  });

export default connection;
