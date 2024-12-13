// import { RequestHandler } from 'express';
// import { UserResponse } from '../../../application/dtos/Response';
// import { ProtectedUser, User } from '../../../domain/entities/User';
// import { AppError } from '../../../domain/entities/appError';
// import { verifyPassword } from '../../../application/useCases/auth/emailAuthentication';
// import { createSession } from '../../../application/useCases/auth/session';
// import { AuthenticatedRequestHandler } from '../../../domain/types/Request/AuthenticatedRequestHandler';
// import { hashPassword } from '../../../application/utils/hashPassword';

// export const emailRegister: RequestHandler<
// 	{},
// 	UserResponse,
// 	{
// 		firstName: string;
// 		lastName: string;
// 		email: string;
// 		password: string;
// 	}
// > = async (req, res, next) => {
// 	try {
// 		const { firstName, lastName, email, password } = req.body;

// 		if (!firstName || !lastName || !email || !password)
// 			throw new AppError(400, 'Missing required fields');

// 		const newUser = new User();

// 		// Check if user exists
// 		await newUser.findByEmail(email);
// 		if (newUser.id) throw new AppError(401, 'User already exists');

// 		// Hash password
// 		const hashedPassword = await hashPassword(password);

// 		// Create user in DB
// 		newUser.create(firstName, lastName, email, hashedPassword);

// 		// Create auth session and send cookies
// 		await createSession(res, newUser);

// 		res.json({
// 			success: true,
// 			message: 'User Created successfully',
// 			user: new ProtectedUser(newUser),
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// export const emailLogin: RequestHandler<
// 	{},
// 	UserResponse,
// 	{
// 		email: string;
// 		password: string;
// 	}
// > = async (req, res, next) => {
// 	try {
// 		// Get email and password from request body
// 		const { email, password } = req.body;
// 		if (!email || !password)
// 			throw new AppError(400, 'Missing email or password');

// 		const user = new User();

// 		// Check if user exists
// 		await user.findByEmail(email);
// 		if (!user.id) throw new AppError(401, 'User does not exist');

// 		// Check if password is correct
// 		const isPasswordCorrect = await verifyPassword(user, password);
// 		if (!isPasswordCorrect) throw new AppError(401, 'Incorrect password');

// 		// Create auth session and send cookies
// 		await createSession(res, user);

// 		res.json({
// 			success: true,
// 			message: 'User Logged in successfully',
// 			user: new ProtectedUser(user),
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// export const refreshToken: AuthenticatedRequestHandler<
// 	RequestHandler<{}, UserResponse, {}>
// > = async (req, res, next) => {
// 	try {
// 		await createSession(res, req.user);

// 		res.json({
// 			success: true,
// 			message: 'Token refreshed successfully',
// 			user: new ProtectedUser(req.user),
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
