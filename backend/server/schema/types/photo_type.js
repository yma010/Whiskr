const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat
} = graphql;

const Photo = mongoose.model("photo");
const User = mongoose.model("user");

const PhotoType = new GraphQLObjectType({
  name: "PhotoType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    dateTaken: { type: GraphQLString },
    views: { type: GraphQLInt },
    height: { type: GraphQLFloat },
    width: { type: GraphQLFloat },
    isPublic: { type: GraphQLBoolean },
    imageURL: { type: GraphQLString },
    dateUploaded: { type: GraphQLString },
    photographer: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.photographer);
      }
    },
    albums: {
      type: new GraphQLList(require("./album_type")),
      resolve(parentValue) {
        return Photo.findById(parentValue._id)
          .populate("albums")
          .then(photo => photo.albums);
      }
    },
    tags: {
      type: new GraphQLList(require("./tag_type")),
      resolve(parentValue) {
        return Photo.findById(parentValue._id)
          .populate("tags")
          .then(photo => photo.tags);
      }
    },
    comments: {
      type: new GraphQLList(require("./comment_type")),
      resolve(parentValue) {
        return Photo.findById(parentValue._id)
          .populate("comments")
          .then(photo => photo.comments);
      }
    }
  })
});

module.exports = PhotoType;