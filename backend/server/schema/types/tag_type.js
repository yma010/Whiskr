const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const Tag = mongoose.model("tag");

const TagType = new GraphQLObjectType({
  name: "TagType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    photos: {
      type: new GraphQLList(require("./photo_type")),
      resolve(parentValue) {
        return Tag.findById(parentValue._id)
          .populate("photos")
          .then(tag => tag.photos);
      }
    }
  })
});

module.exports = TagType;