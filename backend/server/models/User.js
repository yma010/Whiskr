const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 12,
    max: 32
  },
  avatarURL: {
    type: String,
    default: `url("../../public/camera-avatar.png")`
  },
  date: {
    type: Date,
    default: Date.now
  },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "photo"
    }
  ],
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'album'
    }
  ]
});

module.exports = mongoose.model("user", UserSchema);