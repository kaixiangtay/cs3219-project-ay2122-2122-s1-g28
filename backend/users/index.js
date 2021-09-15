const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes") //need to change

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const username = "user"; //username for admin
const password = "users123"; //password for admin
const cluster = "Cluster0"; //cluster number
const dbname = "UserDatabase"; //database name for users

mongoose.connect('mongodb+srv://user:users123@cluster0.xfyg0.mongodb.net/UserDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

module.exports = app;