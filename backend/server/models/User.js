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
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'album'
    }
  ]
});

UserSchema.virtual("photos", {
  ref: "photo",
  localField: "_id",
  foreignField: "photographer"
});

UserSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "author"
});

module.exports = mongoose.model("user", UserSchema);