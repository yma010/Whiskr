const graphql = require("graphql");
const mongoose = require("mongoose");
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLBoolean, 
  GraphQLInt } = graphql;
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
	name: "UserType",
	fields: () => ({
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		age: { type: GraphQLInt },
		email: { type: GraphQLString },
		token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    photos: {
      type: require("./photo_type"),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("photos")
          .then(user => user.photos);
      }
    },
    albums: {
      type: require("./album_type"),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("albums")
          .then(user => user.albums);
      }
    }
	})
});

module.exports = UserType;