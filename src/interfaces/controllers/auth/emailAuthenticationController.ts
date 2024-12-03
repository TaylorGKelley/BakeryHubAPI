import { RequestHandler } from 'express';
import { UserResponse } from '../../../application/dtos/Response';
import { ProtectedUser, User } from '../../../domain/entities/User';
import { AppError } from '../../../shared/errors/appError';
import { verifyPassword } from '../../../application/useCases/auth/emailAuthentication';
import { createSession } from '../../../application/useCases/auth/session';

export const signUp: RequestHandler<
	{},
	UserResponse,
	{
		email: string;
		password: string;
		passwordConfirm: string;
	}
> = async (req, res, next) => {
	try {
		const newUser = new User();

		// Check if user exists
		newUser.find(req.body.email);
		if (newUser.id) throw new AppError(401, 'User already exists');

		// TODO: Create User in DB

		// TODO: set cookies

		res.json({
			success: true,
			message: 'User Logged in successfully',
			user: new ProtectedUser(newUser),
		});
	} catch (error) {
		next(error);
	}
};

export const login: RequestHandler<
	{},
	UserResponse,
	{
		email: string;
		password: string;
	}
> = async (req, res, next) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;
		if (!email || !password)
			throw new AppError(400, 'Missing email or password');

		const user = new User();

		// Check if user exists
		user.find(email);
		if (!user.id) throw new AppError(401, 'User does not exist');

		// Check if password is correct
		const isPasswordCorrect = await verifyPassword(user, password);
		if (!isPasswordCorrect) throw new AppError(401, 'Incorrect password');

		// Create auth session and send cookies
		await createSession(res, user);

		res.json({
			success: true,
			message: 'User Logged in successfully',
			user: new ProtectedUser(user),
		});
	} catch (error) {
		next(error);
	}
};
