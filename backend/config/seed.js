const mongoose = require("mongoose");
const db = require('./keys').mongoURI;

const Tag = require('../server/models/Tag');
const Comment = require('../server/models/Comment');
const Album = require('../server/models/Album');
const Photo = require('../server/models/Photo');
const User = require('../server/models/User');

const seed = async function() {
  // connect to database
  await mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB successfully. Ready to seed"))
    .catch(err => console.log(err));

  // delete old documents
  await Promise.all([
    Tag.deleteMany(),
    Comment.deleteMany(),
    Album.deleteMany(),
    Photo.deleteMany(),
    User.deleteMany()
  ]);

  // create demo user
  const demoUser = new User({
    firstName: "Niles",
    lastName: "Mowgli",
    age: 11,
    email: "kitty@aol.com",
    password: "hunterhunter"
  });
  await demoUser.save();

  // disconnect from database
  mongoose.disconnect();
};

seed();