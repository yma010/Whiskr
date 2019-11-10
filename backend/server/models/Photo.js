const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'album'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  dateUploaded: {
    type: Date,
    default: Date.now
  },
  dateTaken: {
    type: Date
  }
});

// index for text search
PhotoSchema.index({
  title: "text",
  description: "text"
});

// before first save: add to user, albums, tags
PhotoSchema.pre("save", async function() {
  const photo = this;
  if (!photo.isNew) return;
  
  const User = mongoose.model("user");
  await Promise.all([
    User.findById(photo.photographer)
      .then(user => {
        user.photos.push(photo);
        return user.save();
      }),
    photo.populate("albums", (_, photo) => (
      Promise.all(photo.albums.map(album => {
        album.photos.push(photo);
        return album.save();
      }))
    )),
    photo.populate("tags", (_, photo) => (
      Promise.all(photo.tags.map(tag => {
        tag.photos.push(photo);
        return tag.save();
      }))
    ))
  ]);
});

// pre delete:
// 1) remove from user, albums, tags (remove empty albums, tags)
// 2) destroy comments
PhotoSchema.pre("deleteOne", async function() {
  const Photo = mongoose.model("photo");
  const User = mongoose.model("user");
  const Comment = mongoose.model("comment");
  const photo = await Photo.findById(this.getFilter());

  await Promise.all([
    User.findById(photo.photographer)
      .then(user => {
        user.photos.pull(photo);
        return user.save();
      }),
    photo.populate("albums", (_, photo) => (
      Promise.all(photo.albums.map(album => {
        album.photos.pull(photo);
        return album.photos.length === 0 ? album.remove() : album.save();
      }))
    )),
    photo.populate("tags", (_, photo) => (
      Promise.all(photo.tags.map(tag => {
        tag.photos.pull(photo);
        return tag.photos.length === 0 ? tag.remove() : tag.save();
      }))
    )),
    Comment.deleteMany({ _id: { $in: photo.comments } })
  ]);
});

module.exports = mongoose.model('photo', PhotoSchema);
