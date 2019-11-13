const mongoose = require("mongoose");
const db = require('./keys').mongoURI;
const faker = require('faker');
const bcrypt = require('bcryptjs');

const Tag = require('../server/models/Tag');
const Comment = require('../server/models/Comment');
const Album = require('../server/models/Album');
const Photo = require('../server/models/Photo');
const User = require('../server/models/User');

const randomNum = (lowerBound, upperBound) => (
  Math.floor(Math.random() * (upperBound  + 1 - lowerBound)) + lowerBound
);

const sampleFromArr = (num, arr) => {
  const copyArr = arr.slice();
  let sample = [];
  while (sample.length < num) {
    sample = sample.concat(copyArr.splice(randomNum(0, copyArr.length - 1), 1));
  }
  return sample;
};

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

  // create users array
  const users = [];

  // create demo user and add to users array
  const demoUser = new User({
    firstName: "Niles",
    lastName: "Mowgli",
    age: 13,
    email: "niles_mowgli@hotmail.com",
    password: "hunterhunter",
    avatarURL: faker.image.avatar()
  });
  demoUser.password = await bcrypt.hash(demoUser.password, 10);
  users.push(demoUser);

  // construct user seeds, add to users array
  // save all users; grab saved documents in new array
  while (users.length < 6) {
    const newUser = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: randomNum(13, 90),
      email: faker.internet.email(),
      password: "password1234"
    });
    newUser.password = await bcrypt.hash(newUser.password, 10);
    users.push(newUser);
  }
  const savedUsers = await User.insertMany(users);

  // create albums for each user
  const albums = [];
  savedUsers.forEach(user => {
    for (let i = 0; i < randomNum(1, 5); i++) {
      const newAlbum = new Album({
        title: faker.random.words(randomNum(1, 3)),
        photographer: user._id
      });
      albums.push(newAlbum);
    }
  });
  const savedAlbums = await Promise.all(albums.map(album => album.save()));

  // create tags
  const tagNames = [];
  const tags = [];
  while (tags.length < 10) {
    const newTagName = faker.commerce.productAdjective();
    if (!tagNames.includes(newTagName)) {
      tagNames.push(newTagName);
      tags.push(new Tag({ name: newTagName }));
    }
  }
  const savedTags = await Promise.all(tags.map(tag => tag.save()));

  // create photos
  const photos = [];
  const usersWithAlbums = await User.find().populate("albums");
  usersWithAlbums.forEach(user => {
    for (let i = 0; i < 20; i++) {
      const newPhoto = new Photo({
        photographer: user._id,
        title: faker.random.words(randomNum(1, 3)),
        description: faker.random.words(randomNum(5, 10)),
        views: randomNum(5, 50),
        isPublic: true,
        imageURL: `http://lorempixel.com/${randomNum(200, 400)}/${randomNum(200, 400)}/cats/${randomNum(1, 9)}`,
        albums: sampleFromArr(randomNum(1, user.albums.length), user.albums),
        tags: sampleFromArr(randomNum(1, 6), savedTags)
      });
      photos.push(newPhoto);
    }
  });
  const savedPhotos = await Promise.all(photos.map(photo => photo.save()));

  // create comments
  const comments = [];
  savedPhotos.forEach(photo => {
    savedUsers.forEach(user => {
      if (photo.photographer !== user._id) {
        const newComment = new Comment({
          author: user._id,
          photo: photo._id,
          body: faker.random.words(randomNum(5,50))
        });
        comments.push(newComment);
      }
    });
  });
  await Promise.all(comments.map(comment => comment.save()));

  // disconnect from database
  mongoose.disconnect();
};

seed();