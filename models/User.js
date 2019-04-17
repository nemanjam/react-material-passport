const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	facebookId: {
		type: String,
		required: true,
		unique: true
	  },
	name: String,
	displayName: String,
	profileUrl: String
});

const User = mongoose.model('users', userSchema);
module.exports = User;

// FUNCTIONS
// REGISTER USER
module.exports.registerUser = (newUser, callback) => {
	newUser.save(callback);
}

// LOOK FOR USER WITH PROVIDED facebookId
module.exports.getUserByFacebookId = (facebookId, callback) => {
	const query = { facebookId };
	User.findOne(query, callback);
}
