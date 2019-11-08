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

module.exports = mongoose.model('album', AlbumSchema);