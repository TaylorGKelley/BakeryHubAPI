import { AppError } from '../../../domain/entities/appError';
import { User } from '../../../domain/entities/User';
import db from '../../../infrastructure/database/drizzle';
import { usersTable } from '../../../infrastructure/database/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';

export const findUserByEmail = async (email: string) => {
	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		return user.at(0) as User | undefined;
	} catch (error) {
		throw new AppError(500, error.message);
	}
};

export const findUserByGoogleId = async (googleId: string) => {
	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.googleId, googleId))
			.limit(1);

		return user.at(0) as User | undefined;
	} catch (error) {
		throw new AppError(500, error.message);
	}
};

export const createUser = async (
	firstName: string,
	lastName: string,
	email: string,
	hashedPassword: string
) => {
	const newUser = await db
		.insert(usersTable)
		.values({
			firstName: firstName,
			lastName: lastName,
			email,
			password: hashedPassword,
		})
		.returning();

	return newUser[0] as User;
};

export const createGoogleUser = async (user: {
	firstName: string;
	lastName: string;
	email: string;
	googleId: string;
}) => {
	const newUser = await db.insert(usersTable).values(user).returning();

	return newUser[0] as User;
};
