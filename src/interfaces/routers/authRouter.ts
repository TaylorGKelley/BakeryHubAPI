import { Router } from 'express';
import passport from 'passport';
import { AppError } from '../../domain/entities/appError';
import { User } from '../../domain/entities/User';

const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
	try {
		await passport.authenticate('local', (err, user, info) => {
			if (err) throw new AppError(500, err.message);
			if (!user) throw new AppError(401, 'Invalid credentials');

			req.login(user, (loginErr) => {
				if (loginErr)
					return res
						.status(500)
						.json({ success: false, message: `Login failed: ${loginErr}` });

				if (req.accepts('json')) {
					res.json({
						success: true,
						message: 'User successfully logged in',
						redirectTo: '/auth/success',
					});
				} else {
					res.redirect(`${process.env.CLIENT_URL!}/auth/success`);
				}
			});
		})(req, res, next);
	} catch (error) {
		next(error);
	}
});

authRouter.post('/register', async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!email || !password) {
			throw new AppError(400, `Missing ${!email ? 'email' : 'password'}`);
		}

		const newUser = new User();

		await newUser.findByEmail(email);

		if (newUser.id) {
			throw new AppError(409, 'User already exists');
		}
		await newUser.create(firstName, lastName, email, password);

		req.login(newUser, (err) => {
			if (err) throw new AppError(400, err);

			if (req.accepts('json')) {
				res.json({
					success: true,
					message: 'User registered',
					redirectTo: '/auth/success',
				});
			} else {
				res.redirect(`${process.env.CLIENT_URL!}/auth/success`);
			}
		});
	} catch (error) {
		next(error);
	}
});

authRouter.delete('/logout', (req, res) => {
	req.logout((err) => {
		console.log('User Logged out ---->');
	});
	if (req.accepts('json')) {
		res.json({
			success: true,
			message: 'User logged out',
			redirectTo: '/auth/logout-success',
		});
	} else {
		res.redirect(`${process.env.CLIENT_URL!}/auth/logout-success`);
	}
});

export default authRouter;
