import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import authEmailUser from './authEmailUser';
import db from '../database/drizzle';
import { eq } from 'drizzle-orm';
import { usersTable } from '../database/drizzle/schema/users.schema';
import { User } from '../../domain/entities/User';
import { AppError } from '../../domain/entities/appError';

passport.use(new LocalStrategy(authEmailUser));

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
