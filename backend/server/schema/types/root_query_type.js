const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

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


const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
    fields: () => ({
      users: {
        type: new GraphQLList(UserType),
        resolve() {
          return User.find({});
        }
      },
      user: {
        type: UserType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(_, args) {
          return User.findById(args._id);
        }
      },
      photos: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(){
          return Photo.find({})
        }
      },
      photo: {
        type: PhotoType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args){
          return Photo.findById(args._id);
        }
      },
      albums: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(){
          return Album.find({});
        }
      },
      album: {
        type: AlbumType,
        args: { id: { type: new GraphQLNonNull(GraphQLID)}},
        resolve(_, args){
          return Album.findById(args._id);
        }
      },
      tags: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(){
          return Tag.find({});
        } 
      },
      tag: {
        type: TagType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) }},
        resolve(){
          return Tag.findById(args._id);
        }
      }, 
      comments: {
        type: new GraphQLNonNull(GraphQLID),
        resolve() {
          return Comment.find({});
        }
      },
      comment: {
        type: CommentType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve() {
          return Comment.findById(args._id);
        }
      },
    })
});
module.exports = RootQueryType;