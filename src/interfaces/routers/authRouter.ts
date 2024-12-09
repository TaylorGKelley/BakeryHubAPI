import { Router } from 'express';
import passport from 'passport';
import { AppError } from '../../domain/entities/appError';
import { User } from '../../domain/entities/User';

const authRouter = Router();

authRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: `${process.env.CLIENT_URL!}/auth/success`,
		failureRedirect: `${process.env.CLIENT_URL!}/auth/failure`,
	})
);

authRouter.post('/register', async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!email || !password) {
			throw new AppError(400, `Missing ${!email ? 'email' : 'password'}`);
		}

		const newUser = await new User();

		if (!(await newUser.find(email))) {
			throw new AppError(401, 'User already exists');
		}

		await newUser.create(firstName, lastName, email, password);

		req.login(newUser, (err) => {
			if (err) return next(err);

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
