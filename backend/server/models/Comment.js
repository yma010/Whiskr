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

module.exports = mongoose.model("comment", CommentSchema);