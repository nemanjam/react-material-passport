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
		const oldUser = await User.findOne({ facebookId: profile.id }).catch( err => { console.log(err); });

		if (oldUser) {
			return done(null, oldUser);
		}
		// register user
		const newUser = await new User({ facebookId: profile.id })
			.save()
			.catch(err => {	console.log(err) });
		done(null, newUser);
	}
)

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: keys.secretOrKey
  };
  
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(facebookLogin);