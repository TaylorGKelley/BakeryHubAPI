import { verifyPassword } from '../../application/useCases/auth/verifyPassword';
import {
	createUser,
	findUserByEmail,
} from '../../application/useCases/auth/user';
import { hashPassword } from '../../application/utils/hashPassword';
import { AppError } from '../../domain/entities/appError';

export class User {
	public id?: number;
	public googleId?: string;
	public githubId?: string;
	public appleId?: string;
	public firstName?: string;
	public lastName?: string;
	public email?: string;
	public emailVerified?: boolean;
	public password?: string;
	public passwordLastChangedAt?: Date;
	public lastLogin?: Date;
	public refreshTokenVersion?: number;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor(user?: Partial<User>) {
		if (!user) return;

		Object.assign(this, user);
	}

	public async find(email: string) {
		try {
			const user = await findUserByEmail(email);
			if (!user) return;

			Object.assign(this, { ...user });

			return this;
		} catch (error) {
			throw new AppError(500, error.message);
		}
	}

	public async verifyPassword(password: string) {
		const isPasswordCorrect = await verifyPassword(this, password);

		if (!isPasswordCorrect) return false;

		this.password = password;

		return true;
	}

	public async create(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		const hashedPassword = await hashPassword(password);

		const newUser = await createUser(
			firstName,
			lastName,
			email,
			hashedPassword
		);

		Object.assign(this, newUser);

		return this;
	}
}

export class ProtectedUser {
	public id: number;
	public firstName: string;
	public lastName: string;
	public email: string;
	public emailVerified: boolean;

	constructor(user: User) {
		Object.assign(this, user);
	}
}
