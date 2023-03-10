const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();

//setup mongoose
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://fehmi:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.fe4ut.mongodb.net/node-angular?retryWrites=true&w=majority"
  ) //node-angular db name created automaticaly with the collection name "posts"(it's the moongose model name in plural)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
//static middleware: any requests targeting "/images" will be allowed to continue and fetch files from there

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
