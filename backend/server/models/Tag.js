const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photos : [
    {
      type: Schema.Types.ObjectId,
      ref: "photo"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('tag', TagSchema)
