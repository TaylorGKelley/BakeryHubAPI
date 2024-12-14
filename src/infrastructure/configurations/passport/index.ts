import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as AppleStrategy } from 'passport-apple';
import localAuthentication from './localAuthentication';
import googleAuthentication from './googleAuthentication';
import appleAuthentication from './appleAuthentication';
import db from '../database/drizzle';
import { eq } from 'drizzle-orm';
import { usersTable } from '../database/drizzle/schema/users.schema';
import { User } from '../../domain/entities/User';
import { AppError } from '../../domain/entities/appError';

passport.use(new LocalStrategy(localAuthentication));
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: '/auth/google/callback',
		},
		googleAuthentication
	)
);
// passport.use(
// 	new AppleStrategy(
// 		{
// 			clientID: process.env.APPLE_CLIENT_ID!,
// 			clientSecret: process.env.APPLE_CLIENT_SECRET!,
// 			callbackURL: '/auth/apple/callback',
// 		} as AppleStrategy.AuthenticateOptions,
// 		appleAuthentication
// 	)
// );

passport.serializeUser((user, done) => {
	// Store user ID in the session
	done(null, (user as User).id); // Assuming the user has an `id` property
});

passport.deserializeUser(async (id, done) => {
	try {
		// Retrieve the user from the database using Drizzle ORM
		const result = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, Number(id)))
			.limit(1);
		const user = result[0];

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		done(null, user); // Attach the user object to `req.user`
	} catch (err) {
		done(err);
	}
});

export default passport;
