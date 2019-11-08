const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      expressGraphQL = require("express-graphql"),
      cors = require("cors"),
      AWS = require('aws-sdk'),
      multer = require("multer"),
      multerS3 = require('multer-s3'),
      keys = require('../config/keys');
      graphQL = require('graphql');

const db = require("../config/keys").mongoURI;
const models = require("./models/index");
const schema = require("./schema/schema");

const app = express();

AWS.config.update({
  secretAccessKey: keys.AWSSecretKey,
  accessKeyId: keys.AWSAccessKey,
  region: keys.AWSRegion
});

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => ({
    schema,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
  }))
);

module.exports = app;
