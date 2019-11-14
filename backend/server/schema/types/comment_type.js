const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const Photo = mongoose.model("photo");
const User = mongoose.model("user");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    photo: {
      type: require("./photo_type"),
      resolve(parentValue) {
        return Photo.findById(parentValue.photo);
      }
    },
    date: { type: GraphQLString },
    author: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.author);
      }
    }
  })
});

module.exports = CommentType;