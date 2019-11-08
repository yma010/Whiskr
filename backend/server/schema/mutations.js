const graphql = require("graphql");
const {  GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const mongoose = require("mongoose");

const UserType = require("./user_type");
const PhotoType = require("./photo_type");
const AlbumType = require("./album_type");
const TagType = require("./tag_type");
const CommentType = require("./comment_type");
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
        name: { type: GraphQLString },
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
        id: { type: GraphQLID }
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
        views: { type: GraphQLInt },
        album: { type: GraphQLID },
        tags: { type: GraphQLList(GraphQLID) },
        comments: { type: GraphQLList(GraphQLID) },
      },
      resolve(_, args){
        return new Photo(args).save();
      }
    },
    deletePhoto: {
      type: PhotoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }){
        return Photo.remove({ _id: id })
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
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }){
        return Album.remove({ _id: id })
      }
    },
    newComment: {
      type: CommentType,
      arg: {
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
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }){
        return Comment.remove({ _id: id })
      }
    }
  }
});

module.exports = mutation;