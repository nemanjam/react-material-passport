const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  provider: {
    type: String,
    required: true
  },

  // google
  googleId: {
    type: String,
    unique: true
  },
  googleEmail: String,
  googleDisplayName: String,
  googlePicture: String,

  // fb
  facebookId: {
    type: String,
    unique: true
  },
  facebookEmail: String,
  facebookDisplayName: String,
  facebookProfileUrl: String
});

const User = mongoose.model("users", userSchema);
module.exports = User;
