const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInt } = graphql;

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
          _id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(_, args) {
          return User.findById(args._id);
        }
      },
      photos: {
        type: new GraphQLList(PhotoType),
        args: {
          limit: { type: GraphQLInt },
          offset: { type: GraphQLInt }
        },
        resolve(_, { limit, offset }){
          return Photo.find({}).skip(offset).limit(limit);
        }
      },
      photo: {
        type: PhotoType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args){
          return Photo.findById(args._id);
        }
      },
      albums: {
        type: new GraphQLList(AlbumType),
        resolve(){
          return Album.find({});
        }
      },
      album: {
        type: AlbumType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID)}},
        resolve(_, args){
          return Album.findById(args._id);
        }
      },
      tags: {
        type: new GraphQLList(TagType),
        resolve(){
          return Tag.find({});
        } 
      },
      tag: {
        type: TagType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID) }},
        resolve(){
          return Tag.findById(args._id);
        }
      }, 
      comments: {
        type: new GraphQLList(CommentType),
        resolve() {
          return Comment.find({});
        }
      },
      comment: {
        type: CommentType,
        args: {
          _id: {
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