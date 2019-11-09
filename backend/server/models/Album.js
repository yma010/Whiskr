const mongoose = require("mongoose");
const {  Schema } = mongoose;


const AlbumSchema = new Schema({
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'photo'
  }],
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// after first save: add to user, photos
AlbumSchema.pre("save", async function() {
  const album = this;
  if (!album.isNew) return;

  const User = mongoose.model("user");

  await Promise.all([
    User.findById(album.photographer)
      .then(user => {
        user.albums.push(album);
        return user.save();
      }),
    album.populate("photos", (_, album) => (
      Promise.all(album.photos.map(photo => {
        photo.albums.push(album);
        return photo.save();
      }))
    ))
  ]);
});

// pre removal: remove from user, photos
AlbumSchema.static("cleanUpBeforeRemoving", async function(album) {
  const User = mongoose.model("user");

  await Promise.all([
    User.findById(album.photographer)
      .then(user => {
        user.albums.pull(album);
        return user.save();
      }),
    album.populate("photos", (_, album) => (
      Promise.all(album.photos.map(photo => {
        photo.albums.pull(album);
        return photo.save()
      }))
    ))
  ]);
});

AlbumSchema.pre("remove", function() {
  const album = this;
  const Album = mongoose.model("album");
  Album.cleanUpBeforeRemoving(album);
});

AlbumSchema.pre("deleteOne", async function() {
  const Album = mongoose.model("album");
  const album = await Album.findById(this.getFilter());
  Album.cleanUpBeforeRemoving(album); 
});

module.exports = mongoose.model('album', AlbumSchema);