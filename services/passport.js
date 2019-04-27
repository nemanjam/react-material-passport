const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys');
const User = require('../models/User');



// FACEBOOK STRATEGY
const facebookLogin = new FacebookStrategy(
	{
		clientID: keys.facebookAppID,
		clientSecret: keys.facebookSecret,
		callbackURL: keys.facebookCallbackURL,
		profileFields: ['id', 'email', 'gender', 'profileUrl', 'displayName']
	},
	async (accessToken, refreshToken, profile, done) => {
		// console.log(profile);

		try {
			const oldUser = await User.findOne({ facebookId: profile.id });

			if (oldUser) { return done(null, oldUser); }

		} catch(err) { 
			console.log(err); 
		}

		// register user
		try {
			const newUser = await new User({facebookId: profile.id, 
											username: profile.username, 
											displayName: profile.displayName,
											profileUrl: profile.profileUrl}).save();
			done(null, newUser);
		} catch(err) {
			console.log(err) 
		}		
	}
);
  
// Create JWT strategy
const jwtLogin = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
		secretOrKey: keys.secretOrKey
	}, 
	async (payload, done) => {
		try {
			const user = await User.findById(payload.sub);

			if (user) { done(null, user); } 
			else { done(null, false); }

		} catch(err) {
			console.log(err);
			done(err, false);
		};
	}
);

passport.use(jwtLogin);
passport.use(facebookLogin);