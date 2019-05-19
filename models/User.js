const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  provider: {
    type: String,
    required: true
  },

  // local
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },

  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  googleEmail: String,
  googleDisplayName: String,
  googlePicture: String,

  // fb
  facebookId: {
    type: String,
    unique: true,
    sparse: true
  },
  facebookEmail: String,
  facebookDisplayName: String,
  facebookProfileUrl: String
});
/*
userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
*/
userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model("users", userSchema);
module.exports = User;
