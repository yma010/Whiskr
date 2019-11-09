const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const User = mongoose.model("user");
const Album = mongoose.model("album");

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    photographer: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.photographer);
      }
    },
    photos: {
      type: new GraphQLList(require("./photo_type")),
      resolve(parentValue) {
        return Album.findById(parentValue._id)
          .populate("photos")
          .then(album => album.photos);
      }
    }
  })
});

module.exports = AlbumType;