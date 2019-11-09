const graphql = require("graphql");
const { 
  GraphQLID, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean } = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const PhotoType = require("./types/photo_type");
const AlbumType = require("./types/album_type");
const TagType = require("./types/tag_type");
const CommentType = require("./types/comment_type");
const User = mongoose.model("user");
const Photo = mongoose.model("photo");
const Album = mongoose.model("album");
const Tag = mongoose.model("tag");
const Comment = mongoose.model("comment");
const AuthService = require("../services/auth");


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.signup(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newPhoto: {
      type: PhotoType,
      args: {
        photographer: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        albums: { type: new GraphQLList(GraphQLID) },
        tags: { type: GraphQLList(GraphQLID) },
        imageURL: { type: GraphQLString },
        isPublic: { type: GraphQLBoolean }
      },
      resolve(_, args){
        return new Photo(args).save();
      }
    },
    deletePhoto: {
      type: PhotoType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }){
        return Photo.deleteOne({ _id })
      }
    },
    newAlbum: {
      type: AlbumType,
      args: {
        photographer: { type: GraphQLID },
        photos: { type: GraphQLList(GraphQLID) },
        title: { type: GraphQLString }
      },
      resolve(parentValue, args){
        return new Album(args).save();
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }){
        return Album.deleteOne({ _id })
      }
    },
    newComment: {
      type: CommentType,
      args: {
        author: { type: GraphQLID },
        photo: { type: GraphQLID },
        body: { type: GraphQLString },
      },
      resolve(parentValue, args){
        return new Comment(args).save();
      }
    },
    deleteComment: {
      type: CommentType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parentValue, { _id }){
        return Comment.deleteOne({ _id })
      }
    }
  }
});

module.exports = mutation;