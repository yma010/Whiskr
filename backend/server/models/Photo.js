const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  views : {
    type: Number,
    default: 0
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album'
  },
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

PhotoSchema.index({
  title: "text",
  description: "text"
});
PhotoSchema.index({ photographer: 1, title: 1, album: 1 }, { unique: true });

module.exports = mongoose.model('photo', PhotoSchema)
