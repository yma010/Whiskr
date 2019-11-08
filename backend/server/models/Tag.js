const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'photo'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

TagSchema.virtual("photos").get(function () {
  const Photo = mongoose.model("photo");
  return Photo.find({ tags: this._id });
});