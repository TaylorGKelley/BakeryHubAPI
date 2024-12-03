import { verifyPassword } from '../../application/useCases/auth/emailAuthentication';

export class User {
	public id?: number;
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

	public find(email: string) {
		// TODO
		console.log(email);
	}

	public create(email: string, password: string, passwordConfirm: string) {
		// TODO
		console.log(email, password, passwordConfirm);
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
