const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const Router = require("./routes/userRoutes")

const app = express();

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const username = "user"; //username for admin
const password = "users123"; //password for admin
const cluster = "Cluster0"; //cluster number
const dbname = "UserDatabase"; //database name for users
// const connectionURL = "mongodb+srv://user:users123@cluster0.xfyg0.mongodb.net/UserDatabase?retryWrites=true&w=majority";

const connectionURL = "mongodb+srv://user:users123@cluster0.qgtd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // for kai xiang backup db testing

mongoose.connect(connectionURL,
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