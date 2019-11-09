const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'photo'
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// before first save: add to photo
CommentSchema.pre("save", async function() {
  const comment = this;
  if (!comment.isNew) return;

  const Photo = mongoose.model("photo");

  await Photo.findById(comment.photo)
    .then(photo => {
      photo.comments.push(comment);
      return photo.save();
    });
});

// before deleteOne: remove from photo
CommentSchema.pre("deleteOne", async function () {
  const Photo = mongoose.model("photo");
  const Comment = mongoose.model("comment");
  const comment = await Comment.findById(this.getFilter());

  await Photo.findById(comment.photo)
    .then(photo => {
      photo.comments.pull(comment);
      return photo.save();
    });
});

module.exports = mongoose.model("comment", CommentSchema);